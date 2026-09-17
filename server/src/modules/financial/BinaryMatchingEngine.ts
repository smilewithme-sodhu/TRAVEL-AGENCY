import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '../../db';

export class BinaryMatchingEngine {
  public async processCycleForNode(nodeId: string, cycleId: string, matchingRate: Prisma.Decimal): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // 1. Fetch Node with Row Lock (Pessimistic)
      const nodes = await tx.$queryRaw<any[]>`
        SELECT id, "memberId", "leftCarryForward", "rightCarryForward", "totalMatchedVolume"
        FROM "BinaryNode"
        WHERE id = ${nodeId}::uuid
        FOR UPDATE
      `;

      if (!nodes || nodes.length === 0) {
        throw new Error(`BinaryNode ${nodeId} not found`);
      }

      const node = nodes[0];
      const leftCF = new Prisma.Decimal(node.leftCarryForward);
      const rightCF = new Prisma.Decimal(node.rightCarryForward);

      if (leftCF.greaterThan(0) && rightCF.greaterThan(0)) {
        // Find matching volume
        const matchedVolume = Prisma.Decimal.min(leftCF, rightCF);
        const cashReward = matchedVolume.mul(matchingRate);

        // Get Rule Version for Reward creation
        const ruleVersion = await tx.ruleVersion.findFirst({
          where: { isActive: true },
        });

        if (!ruleVersion) {
          throw new Error('No active rule version found');
        }

        // 1. Update BinaryNode
        await tx.$queryRaw`
          UPDATE "BinaryNode"
          SET 
            "leftCarryForward" = "leftCarryForward" - ${matchedVolume},
            "rightCarryForward" = "rightCarryForward" - ${matchedVolume},
            "totalMatchedVolume" = "totalMatchedVolume" + ${matchedVolume},
            "updatedAt" = NOW()
          WHERE id = ${nodeId}::uuid
        `;

        // 2. Create Reward
        const idempotencyKey = `cycle-${cycleId}-node-${nodeId}`;

        const existingReward = await tx.reward.findUnique({
          where: { idempotencyKey }
        });

        let rewardId: string;

        if (existingReward) {
          rewardId = existingReward.id;
        } else {
          const newReward = await tx.reward.create({
            data: {
              memberId: node.memberId,
              ruleVersionId: ruleVersion.id,
              rewardType: 'BINARY',
              baseAmount: matchedVolume,
              rate: matchingRate,
              calculatedAmount: cashReward,
              finalAmount: cashReward,
              status: 'AVAILABLE',
              idempotencyKey,
              sourceBookingId: cycleId
            }
          });
          rewardId = newReward.id;

          // 3. Create RewardLedger
          await tx.rewardLedger.create({
            data: {
              rewardId,
              memberId: node.memberId,
              transactionType: 'CREDIT_BINARY_REWARD',
              status: 'AVAILABLE',
              amount: cashReward,
              notes: `Binary Cycle Match: ${matchedVolume.toString()} PV`,
              sourceBookingId: cycleId
            }
          });
        }
      }
    });
  }
}
