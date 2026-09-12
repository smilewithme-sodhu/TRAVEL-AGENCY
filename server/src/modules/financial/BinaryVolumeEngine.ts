import { Prisma } from "@prisma/client";

export interface BinaryNodeVolume {
  leftVolume: Prisma.Decimal;
  rightVolume: Prisma.Decimal;
  carryForwardSide: "LEFT" | "RIGHT" | "NONE";
  carryForwardAmount: Prisma.Decimal;
}

export class BinaryVolumeEngine {
  /**
   * Calculates the binary matching output.
   * Matches MIN(Left, Right).
   * Generates Carry Forward for the remainder.
   */
  static calculateMatching(left: Prisma.Decimal, right: Prisma.Decimal): {
    matchedVolume: Prisma.Decimal;
    carryForwardLeft: Prisma.Decimal;
    carryForwardRight: Prisma.Decimal;
  } {
    const matchedVolume = Prisma.Decimal.min(left, right);
    
    return {
      matchedVolume,
      carryForwardLeft: left.minus(matchedVolume),
      carryForwardRight: right.minus(matchedVolume)
    };
  }

  /**
   * Computes the final cap based on contribution constraints
   */
  static applyCap(matchedVolume: Prisma.Decimal, contributionCap: Prisma.Decimal): Prisma.Decimal {
    if (matchedVolume.greaterThan(contributionCap)) {
      return contributionCap;
    }
    return matchedVolume;
  }
}
