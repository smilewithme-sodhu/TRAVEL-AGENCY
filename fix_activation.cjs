const fs = require('fs');
const file = 'server/src/modules/booking/BookingStateMachine.ts';
let content = fs.readFileSync(file, 'utf8');

const targetStr = if (targetStatus === BookingStatus.BOOKING_CONFIRMED) {
          await this.seedPendingRewardLedgerEntries(tx, updated, actorId);
        };

const replacementStr = if (targetStatus === BookingStatus.BOOKING_CONFIRMED) {
          await this.seedPendingRewardLedgerEntries(tx, updated, actorId);
          
          // --- Custom Addition: Activate Member ---
          if (updated.memberId) {
            await tx.member.update({
              where: { id: updated.memberId },
              data: {
                greenStatus: "GREEN",
                greenActivatedAt: now,
                // Setting to expire 1 year from now for active cycle
                greenExpiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), 
              }
            });
          }
        };

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Member activation added successfully");
} else {
  console.log("Could not find target string");
}
