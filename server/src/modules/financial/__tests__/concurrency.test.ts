import { WalletLedgerService, ConcurrencyException } from "../WalletLedgerService";
import { PrismaClient, Prisma } from "@prisma/client";

import { mockDeep, mockReset } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();

describe("WalletLedgerService - Concurrency Stress Test", () => {
  let sut: WalletLedgerService;

  beforeEach(() => {
    mockReset(prismaMock);
    sut = new WalletLedgerService(prismaMock);
  });

  it("should prevent double-spending when 20 simultaneous withdrawals are requested", async () => {
    // We mock the interactive transaction to simulate DB locks and state mutations
    // across concurrent promises.
    
    let sharedBalance = new Prisma.Decimal(5000); // Start with exactly 5000
    let lockAcquired = false;

    prismaMock.$transaction.mockImplementation(async (fn: any, options: any) => {
      // Simulate Serializable isolation and FOR UPDATE lock contention
      if (lockAcquired) {
        throw new Prisma.PrismaClientKnownRequestError(
          "Transaction failed due to a write conflict or a deadlock. Please retry your transaction",
          { code: "P2034", clientVersion: "7.10.0" }
        );
      }

      lockAcquired = true;

      const txMock = mockDeep<Prisma.TransactionClient>();

      // Mock the FOR UPDATE query
      (txMock.$queryRaw.mockImplementation as any)(async (query: any) => {
        const queryString = Array.isArray(query) ? query[0] : (query.strings ? query.strings[0] : query);
        if (typeof queryString === 'string' && queryString.includes("COALESCE")) {
          return [{ balance: sharedBalance.toNumber() }] as any;
        } else if (typeof queryString === 'string' && queryString.includes("wallets")) {
          return [{ id: "wallet-uuid-1", currency: "INR" }] as any;
        }
        console.log("Unmatched query:", queryString);
        return [];
      });

      txMock.walletTransaction.findUnique.mockResolvedValue(null);
      
      (txMock.walletTransaction.create.mockImplementation as any)(async ({ data }: any) => {
        console.log("Create called with balanceAfter:", data.balanceAfter);
        sharedBalance = new Prisma.Decimal(data.balanceAfter);
        return {} as any;
      });

      try {
        // Execute the service logic
        const result = await fn(txMock);
        return result;
      } finally {
        lockAcquired = false;
      }
    });

    // Fire 20 concurrent requests for the full 5000 balance
    const requests = Array.from({ length: 20 }).map((_, i) => 
      sut.requestWithdrawal("member-uuid-1", new Prisma.Decimal(5000), `idem-key-${i}`)
        .then(result => ({ status: 'fulfilled', result }))
        .catch(error => ({ status: 'rejected', error }))
    );

    // Give the event loop a tiny delay so promises run eagerly together
    const results = await Promise.all(requests);

    const successes = results.filter(r => r.status === 'fulfilled');
    const failures = results.filter(r => r.status === 'rejected');
    
    console.log("Successes count:", successes.length);
    if (successes.length === 0) {
       console.log("First failure:", failures[0]);
    }

    // Asserts
    expect(successes).toHaveLength(1);
    expect(failures).toHaveLength(19);

    const successfulWithdrawal = successes[0] as any;
    expect(successfulWithdrawal.result.newBalance.toNumber()).toBe(0);

    // Verify failures were concurrency/insufficient funds errors
    failures.forEach((f: any) => {
      const isConcurrencyOrPrismaError = 
        f.error instanceof ConcurrencyException || 
        f.error.code === "P2034" || f.error.message === "Wallet not found";
      
      if (!isConcurrencyOrPrismaError) {
         console.error(f.error);
      }
      expect(isConcurrencyOrPrismaError).toBe(true);
    });

    // Final balance check
    expect(sharedBalance.toNumber()).toBe(0);
  });
});
