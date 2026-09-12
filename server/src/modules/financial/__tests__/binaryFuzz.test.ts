import { BinaryVolumeEngine } from "../BinaryVolumeEngine";
import { Prisma } from "@prisma/client";
import * as fc from "fast-check";

describe("BinaryVolumeEngine - Property Based Fuzz Testing", () => {
  
  it("should always satisfy: Matched = MIN(Left, Right) and Unmatched = Carry-Forward", () => {
    // Generate 5000 randomized permutations of left/right volumes
    fc.assert(
      fc.property(
        // Volumes from 0 to 100,000 with 2 decimal places
        fc.integer({ min: 0, max: 10000000 }).map(x => new Prisma.Decimal(x).dividedBy(100)),
        fc.integer({ min: 0, max: 10000000 }).map(x => new Prisma.Decimal(x).dividedBy(100)),
        
        (leftVol, rightVol) => {
          const result = BinaryVolumeEngine.calculateMatching(leftVol, rightVol);

          // Invariant 1: Matched Volume MUST equal MIN(Total Left, Total Right).
          const expectedMatch = leftVol.lessThan(rightVol) ? leftVol : rightVol;
          expect(result.matchedVolume.equals(expectedMatch)).toBe(true);

          // Invariant 2: Unmatched volume MUST equal the exact Carry-Forward balance.
          const totalCarryForward = result.carryForwardLeft.plus(result.carryForwardRight);
          const expectedUnmatched = leftVol.plus(rightVol).minus(result.matchedVolume.times(2));
          
          expect(totalCarryForward.equals(expectedUnmatched)).toBe(true);

          // Invariant 3: Only one leg can have carry-forward > 0 at any time
          const bothHaveCarryForward = result.carryForwardLeft.greaterThan(0) && result.carryForwardRight.greaterThan(0);
          expect(bothHaveCarryForward).toBe(false);
          
          // Invariant 4: No negative values generated
          expect(result.matchedVolume.isNegative()).toBe(false);
          expect(result.carryForwardLeft.isNegative()).toBe(false);
          expect(result.carryForwardRight.isNegative()).toBe(false);
        }
      ),
      { numRuns: 5000 } // Execute 5,000 randomized permutations as requested
    );
  });

  it("should never exceed the contribution cap", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000000 }).map(x => new Prisma.Decimal(x).dividedBy(100)),
        fc.integer({ min: 1000, max: 1000000 }).map(x => new Prisma.Decimal(x).dividedBy(100)), // cap
        
        (matchedVol, cap) => {
          const actualReward = BinaryVolumeEngine.applyCap(matchedVol, cap);

          // Invariant: Total rewards created MUST be <= Contribution Cap.
          expect(actualReward.lessThanOrEqualTo(cap)).toBe(true);
          
          if (matchedVol.lessThan(cap)) {
             expect(actualReward.equals(matchedVol)).toBe(true);
          } else {
             expect(actualReward.equals(cap)).toBe(true);
          }
        }
      ),
      { numRuns: 5000 }
    );
  });
});
