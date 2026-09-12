import { PrismaClient, Prisma, TransactionType, TransactionStatus } from "@prisma/client";


export class ConcurrencyException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConcurrencyException";
    Object.setPrototypeOf(this, ConcurrencyException.prototype);
  }
}

export class WalletLedgerService {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Safe withdrawal request with row-level locking.
   * Proves isolation and prevents phantom reads under concurrent load.
   */
  async requestWithdrawal(
    memberId: string,
    amount: Prisma.Decimal,
    idempotencyKey: string
  ): Promise<{ success: boolean; newBalance: Prisma.Decimal }> {
    return await this.prisma.$transaction(
      async (tx) => {
        // 1. SELECT FOR UPDATE to lock the wallet row
        const walletResult = await tx.$queryRaw<{ id: string; currency: string }[]>`
          SELECT id, currency FROM wallets 
          WHERE "memberId" = ${memberId}::uuid 
          FOR UPDATE
        `;

        if (!walletResult.length) {
          throw new Error("Wallet not found");
        }
        const wallet = walletResult[0];

        // 2. Calculate true balance dynamically from ledger
        // In real SQL this would be an aggregation query. For Prisma mocking,
        // we simulate the aggregation or retrieve it safely.
        const ledgerQuery = await tx.$queryRaw<{ balance: number }[]>`
          SELECT 
            COALESCE(SUM(CASE WHEN "transactionType" LIKE 'CREDIT_%' THEN amount ELSE 0 END), 0) -
            COALESCE(SUM(CASE WHEN "transactionType" LIKE 'DEBIT_%' THEN amount ELSE 0 END), 0)
            AS balance
          FROM wallet_transactions
          WHERE "walletId" = ${wallet.id}::uuid
            AND status IN ('AVAILABLE', 'PAID')
        `;

        const currentBalance = new Prisma.Decimal(ledgerQuery[0]?.balance || 0);

        if (currentBalance.lessThan(amount)) {
          throw new ConcurrencyException("Insufficient funds");
        }

        const newBalance = currentBalance.minus(amount);

        // 3. Prevent duplicate processing
        const existingTx = await tx.walletTransaction.findUnique({
          where: { idempotencyKey },
        });

        if (existingTx) {
          return { success: true, newBalance };
        }

        // 4. Append DEBIT row
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            transactionType: TransactionType.DEBIT_WITHDRAWAL,
            status: TransactionStatus.PENDING,
            amount: amount,
            balanceAfter: newBalance,
            idempotencyKey,
          },
        });

        return { success: true, newBalance };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  }
}
