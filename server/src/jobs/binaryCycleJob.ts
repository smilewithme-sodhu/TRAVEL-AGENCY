import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { BinaryMatchingEngine } from '../modules/financial/BinaryMatchingEngine';

export function startBinaryCycleCron() {
  cron.schedule('0 0 * * *', async () => {
    console.log('[BinaryCycleJob] Starting nightly binary cycle matching...');
    const cycleId = uuidv4(); 
    let successCount = 0;
    let failCount = 0;

    try {
      const eligibleNodes = await prisma.binaryNode.findMany({
        where: {
          leftCarryForward: { gt: 0 },
          rightCarryForward: { gt: 0 },
        },
        select: { id: true }
      });

      console.log(`[BinaryCycleJob] Found ${eligibleNodes.length} eligible nodes for cycle matching.`);

      if (eligibleNodes.length === 0) {
        console.log('[BinaryCycleJob] No eligible nodes found. Exiting.');
        return;
      }

      const ruleVersion = await prisma.ruleVersion.findFirst({
        where: { isActive: true }
      });

      if (!ruleVersion) {
        throw new Error('No active rule version found! Cannot calculate matching cash equivalent.');
      }

      const matchingRate = ruleVersion.binaryMatchRate;

      const engine = new BinaryMatchingEngine();

      for (const { id } of eligibleNodes) {
        try {
          await engine.processCycleForNode(id, cycleId, matchingRate);
          successCount++;
        } catch (err: any) {
          console.error(`[BinaryCycleJob] Error processing node ${id}:`, err.message);
          failCount++;
        }
      }

      console.log(`[BinaryCycleJob] Completed. Processed: ${successCount} successful, ${failCount} failed.`);
    } catch (globalErr: any) {
      console.error(`[BinaryCycleJob] CRITICAL FAILURE during cycle execution:`, globalErr.message);
    }
  });

  console.log('[BinaryCycleJob] Cron job initialized (Scheduled: 0 0 * * *).');
}
