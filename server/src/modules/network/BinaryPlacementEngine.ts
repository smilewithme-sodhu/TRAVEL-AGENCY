import { Prisma, TreeSide } from '@prisma/client';

export class BinaryPlacementEngine {
  /**
   * Finds the absolute bottom slot on the extreme outer edge of the chosen leg.
   */
  public async findSpilloverSlot(
    tx: Prisma.TransactionClient,
    sponsorMemberId: string,
    leg: 'LEFT' | 'RIGHT'
  ): Promise<{ parentId: string; position: 'LEFT' | 'RIGHT'; parentDepth: number; parentPath: string }> {
    let current = await tx.binaryNode.findUnique({
      where: { memberId: sponsorMemberId },
    });

    if (!current) {
      throw new Error('Sponsor does not have a binary node');
    }

    while (true) {
      const childId: string | null = leg === 'LEFT' ? current.leftChildId : current.rightChildId;
      
      if (!childId) {
        // We found the empty slot at the bottom of the outer edge
        return {
          parentId: current.id,
          position: leg,
          parentDepth: current.depth,
          parentPath: current.path,
        };
      }

      // Move down to the next child on the outer edge
      current = await tx.binaryNode.findUnique({
        where: { id: childId },
      });

      if (!current) {
        throw new Error('Tree integrity error: child node referenced but not found in database');
      }
    }
  }
}
