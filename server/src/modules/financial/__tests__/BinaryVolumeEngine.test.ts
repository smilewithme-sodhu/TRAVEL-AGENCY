// =============================================================================
// BinaryVolumeEngine.test.ts
//
// Tests for volume rollup (tree traversal) and cycle matching.
// Includes structural safety tests for circular references.
// =============================================================================

import { BinaryVolumeEngine } from "../BinaryVolumeEngine";
import { PrismaClient, Prisma, TreeSide, TransactionType, TransactionStatus, RewardStatus, RewardType } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();

describe("BinaryVolumeEngine", () => {
  let sut: BinaryVolumeEngine;

  beforeEach(() => {
    mockReset(prismaMock);
    sut = new BinaryVolumeEngine(prismaMock);
  });

  // ===========================================================================
  // 1. rollUpVolume
  // ===========================================================================
  describe("rollUpVolume (Iterative Traversal)", () => {
    it("should roll volume up 3 levels and create BinaryVolumeEvents", async () => {
      // Mock the transaction
      prismaMock.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();

        // We simulate a tree:
        // Root (node-1) -> Left Child (node-2) -> Right Child (node-3)
        // Purchaser is node-3.

        // First query: find start node
        txMock.binaryNode.findUnique.mockResolvedValueOnce({
          id: "node-3",
          memberId: "member-3",
          parentId: "node-2",
          leftChildId: null,
          rightChildId: null,
        } as any);

        // Next query in loop: find parent node-2
        txMock.binaryNode.findUnique.mockResolvedValueOnce({
          id: "node-2",
          memberId: "member-2",
          parentId: "node-1",
          leftChildId: null,
          rightChildId: "node-3", // node-3 is on the right
        } as any);

        // Next query in loop: find parent node-1 (Root)
        txMock.binaryNode.findUnique.mockResolvedValueOnce({
          id: "node-1",
          memberId: "member-1",
          parentId: null,
          leftChildId: "node-2", // node-2 is on the left
          rightChildId: null,
        } as any);

        txMock.binaryVolumeEvent.create.mockResolvedValue({} as any);

        await fn(txMock);

        // Assertions
        // It should have created 2 volume events (one for node-2, one for node-1)
        expect(txMock.binaryVolumeEvent.create).toHaveBeenCalledTimes(2);

        // Event for node-2: side should be RIGHT
        expect(txMock.binaryVolumeEvent.create).toHaveBeenNthCalledWith(1, {
          data: expect.objectContaining({
            binaryNodeId: "node-2",
            memberId: "member-2",
            treeSide: TreeSide.RIGHT,
            eligibleAmount: new Prisma.Decimal(100),
          }),
        });

        // Event for node-1: side should be LEFT
        expect(txMock.binaryVolumeEvent.create).toHaveBeenNthCalledWith(2, {
          data: expect.objectContaining({
            binaryNodeId: "node-1",
            memberId: "member-1",
            treeSide: TreeSide.LEFT,
            eligibleAmount: new Prisma.Decimal(100),
          }),
        });
      });

      await sut.rollUpVolume("booking-uuid", "member-3", new Prisma.Decimal(100));
    });

    it("should prevent infinite loops on circular references", async () => {
      prismaMock.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();

        // Node 1 points to Node 2. Node 2 points back to Node 1.
        txMock.binaryNode.findUnique.mockResolvedValueOnce({
          id: "node-1",
          memberId: "member-1",
          parentId: "node-2", // Parent is node-2
        } as any);

        txMock.binaryNode.findUnique.mockResolvedValueOnce({
          id: "node-2",
          memberId: "member-2",
          parentId: "node-1", // Circular! Parent is node-1
          leftChildId: "node-1",
          rightChildId: null,
        } as any);

        return fn(txMock);
      });

      await expect(
        sut.rollUpVolume("booking-uuid", "member-1", new Prisma.Decimal(100))
      ).rejects.toThrow(/CRITICAL: Circular reference detected/);
    });
  });

  // ===========================================================================
  // 2. processCycleMatching
  // ===========================================================================
  describe("processCycleMatching", () => {
    it("should match MIN(Left, Right), calculate carry forward, and seed rewards", async () => {
      prismaMock.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();

        // Return a mock aggregate for one node that has unmatched volume
        // Left total = 5000, Right total = 3000, previously matched = 1000
        // Available Left = 4000, Available Right = 2000
        // Expected Match = 2000
        // Expected Carry Forward Left = 2000, Right = 0
        (txMock.$queryRaw as any).mockResolvedValueOnce([
          {
            binaryNodeId: "node-1",
            memberId: "member-1",
            left_eligible: 5000,
            right_eligible: 3000,
            total_matched: 1000,
          },
        ]);

        txMock.binaryVolumeEvent.create.mockResolvedValue({} as any);
        txMock.reward.create.mockResolvedValue({} as any);
        txMock.rewardLedger.create.mockResolvedValue({} as any);

        await fn(txMock);

        // Assertions for the volume event
        expect(txMock.binaryVolumeEvent.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            binaryNodeId: "node-1",
            memberId: "member-1",
            treeSide: TreeSide.LEFT, // Dominant side
            eligibleAmount: 0,
            matchedAmount: new Prisma.Decimal(2000), // MIN(4000, 2000)
            carryForward: new Prisma.Decimal(2000), // MAX(2000, 0)
            cycleId: "cycle-uuid",
            isReversed: false,
          }),
        });

        // Assertions for the reward seeding (10% commission of 2000 = 200)
        expect(txMock.reward.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            memberId: "member-1",
            rewardType: RewardType.BINARY,
            baseAmount: new Prisma.Decimal(2000),
            rate: new Prisma.Decimal(0.1),
            calculatedAmount: new Prisma.Decimal(200),
          }),
        });

        // Assertions for the reward ledger
        expect(txMock.rewardLedger.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            memberId: "member-1",
            transactionType: TransactionType.CREDIT_BINARY_REWARD,
            amount: new Prisma.Decimal(200),
          }),
        });
      });

      const result = await sut.processCycleMatching("cycle-uuid", new Prisma.Decimal(0.1), new Prisma.Decimal(0.5));
      
      expect(result.totalNodesProcessed).toBe(1);
      expect(result.totalMatchedVolume.toNumber()).toBe(2000);
      expect(result.totalCommissionsGenerated.toNumber()).toBe(200);
    });

    it("should safely skip nodes with zero volume on one leg", async () => {
        prismaMock.$transaction.mockImplementation(async (fn: any) => {
          const txMock = mockDeep<Prisma.TransactionClient>();
  
          // Left total = 5000, Right total = 1000, previously matched = 1000
          // Available Left = 4000, Available Right = 0
          // Should skip!
          (txMock.$queryRaw as any).mockResolvedValueOnce([
            {
              binaryNodeId: "node-1",
              memberId: "member-1",
              left_eligible: 5000,
              right_eligible: 1000,
              total_matched: 1000,
            },
          ]);
  
          await fn(txMock);
          
          expect(txMock.binaryVolumeEvent.create).not.toHaveBeenCalled();
          expect(txMock.reward.create).not.toHaveBeenCalled();
        });
  
        const result = await sut.processCycleMatching("cycle-uuid", new Prisma.Decimal(0.1), new Prisma.Decimal(0.5));
        
        expect(result.totalNodesProcessed).toBe(1);
        expect(result.totalMatchedVolume.toNumber()).toBe(0);
        expect(result.totalCommissionsGenerated.toNumber()).toBe(0);
      });
  });
});
