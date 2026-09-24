import { Prisma, TransactionType, RewardType, RewardStatus, TransactionStatus, MemberGreenStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

export class TeamBonusEngine {
  /**
   * Distributes the Unilevel Team Bonus (50%, 25%, 15%, 10%) up the sponsorship lineage.
   * Utilizes Dynamic Compression to skip inactive ("INACTIVE" / non-"ACTIVE") sponsors.
   *
   * @param tx The Prisma Transaction Client for atomicity
   * @param bookingId The ID of the booking generating the team bonus
   * @param purchaserMemberId The ID of the member who made the purchase (the bottom of the tree)
   * @param totalBudget The total team reward budget for this booking
   * @param cycleId A reference ID (like the active rule ID or temporal cycle)
   */
  public async distributeTeamBonus(
    tx: Prisma.TransactionClient,
    bookingId: string,
    purchaserMemberId: string,
    totalBudget: Prisma.Decimal,
    cycleId: string
  ): Promise<void> {
    if (totalBudget.lte(0)) return;

    // 1. Fetch Lineage via Recursive CTE (max 20 levels deep)
    const lineage = await tx.$queryRaw<
      { sponsorId: string; level: number; greenStatus: string }[]
    >`
      WITH RECURSIVE lineage AS (
        -- Base case: The direct sponsor of the purchaser
        SELECT 
          r."referrerMemberId" AS "sponsorId",
          1 AS "level",
          m."greenStatus"
        FROM referrals r
        JOIN members m ON m.id = r."referrerMemberId"
        WHERE r."referredMemberId" = ${purchaserMemberId}::uuid
          AND r."isValid" = true

        UNION ALL

        -- Recursive step: The sponsor of the previous sponsor
        SELECT 
          r."referrerMemberId" AS "sponsorId",
          l."level" + 1 AS "level",
          m."greenStatus"
        FROM referrals r
        JOIN lineage l ON r."referredMemberId" = l."sponsorId"
        JOIN members m ON m.id = r."referrerMemberId"
        WHERE l."level" < 20
          AND r."isValid" = true
      )
      SELECT "sponsorId", "level", "greenStatus"
      FROM lineage
      ORDER BY "level" ASC;
    `;

    if (!lineage || lineage.length === 0) {
      return; // No sponsors in the upline
    }

    // 2. Dynamic Compression: Filter only "ACTIVE" / "ACTIVE_GRACE" / etc.
    // The prompt mentions "Green" (Active/qualified). Based on MemberGreenStatus enum.
    const activeSponsors = lineage.filter(
      (node) => node.greenStatus === MemberGreenStatus.ORANGE
    );

    // 3. Define Payout Matrix for 4 levels
    const payoutMatrix = [
      new Prisma.Decimal(0.50), // L1: 50%
      new Prisma.Decimal(0.25), // L2: 25%
      new Prisma.Decimal(0.15), // L3: 15%
      new Prisma.Decimal(0.10), // L4: 10%
    ];

    // 4. Distribute to up to 4 active ancestors
    const iterations = Math.min(activeSponsors.length, payoutMatrix.length);

    for (let i = 0; i < iterations; i++) {
      const sponsor = activeSponsors[i];
      const shareRate = payoutMatrix[i];
      const payoutAmount = totalBudget.mul(shareRate);

      if (payoutAmount.lte(0)) continue;

      const rewardId = randomUUID();
      const idempotencyKey = `TEAM-BONUS-${bookingId}-LVL${i + 1}`;

      // Seed Reward Row
      await tx.reward.create({
        data: {
          id: rewardId,
          memberId: sponsor.sponsorId,
          sourceBookingId: bookingId,
          ruleVersionId: cycleId,
          rewardType: RewardType.TEAM,
          baseAmount: totalBudget,
          rate: shareRate,
          calculatedAmount: payoutAmount,
          finalAmount: payoutAmount,
          status: RewardStatus.PENDING,
          idempotencyKey,
        },
      });

      // Seed RewardLedger Row
      await tx.rewardLedger.create({
        data: {
          rewardId,
          memberId: sponsor.sponsorId,
          sourceBookingId: bookingId,
          transactionType: TransactionType.CREDIT_TEAM_REWARD,
          status: TransactionStatus.PENDING,
          amount: payoutAmount,
          notes: `Team Bonus (Level ${i + 1} Compressed, Actual L${sponsor.level}) for Booking ${bookingId}`,
        },
      });
    }
  }
}

