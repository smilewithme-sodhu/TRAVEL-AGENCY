import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { z } from 'zod';
import { TransactionType, TransactionStatus, WithdrawalStatus } from '@prisma/client';
import { getJwtSecret } from '../utils/jwt';

export const walletRouter = Router();

const withdrawSchema = z.object({
  amount: z.number().positive(),
});

walletRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string, memberId: string };
    
    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    let wallet = await prisma.wallet.findUnique({
      where: { memberId: decoded.memberId }
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { memberId: decoded.memberId, currency: 'INR' }
      });
    }

    const transactions = await prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' }
    });

    let totalEarned = 0;
    let pendingWithdrawals = 0;
    let totalWithdrawn = 0;

    for (const tx of transactions) {
      if (tx.transactionType.startsWith('CREDIT') && (tx.status === 'AVAILABLE' || tx.status === 'PAID')) {
        totalEarned += Number(tx.amount);
      }
      if (tx.transactionType === 'DEBIT_WITHDRAWAL') {
        if (tx.status === 'PENDING') {
          pendingWithdrawals += Number(tx.amount);
        }
        if (tx.status === 'PAID' || tx.status === 'APPROVED') {
          totalWithdrawn += Number(tx.amount);
        }
      }
    }

    const availableBalance = totalEarned - pendingWithdrawals - totalWithdrawn;

    res.status(200).json({
      success: true,
      data: {
        wallet: {
          ...wallet,
          availableBalance,
          pendingBalance: pendingWithdrawals,
          totalEarned
        },
        transactions
      }
    });
  } catch (err) {
    next(err);
  }
});

walletRouter.post('/withdraw', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string, memberId: string };
    
    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    const { amount } = withdrawSchema.parse(req.body);

    const wallet = await prisma.wallet.findUnique({ where: { memberId: decoded.memberId } });
    if (!wallet) {
      res.status(404).json({ error: 'Wallet not found' });
      return;
    }

    // Calculate balance
    const transactions = await prisma.walletTransaction.findMany({
      where: { walletId: wallet.id }
    });

    let totalEarned = 0;
    let pendingWithdrawals = 0;
    let totalWithdrawn = 0;

    for (const tx of transactions) {
      if (tx.transactionType.startsWith('CREDIT') && (tx.status === 'AVAILABLE' || tx.status === 'PAID')) {
        totalEarned += Number(tx.amount);
      }
      if (tx.transactionType === 'DEBIT_WITHDRAWAL') {
        if (tx.status === 'PENDING') {
          pendingWithdrawals += Number(tx.amount);
        }
        if (tx.status === 'PAID' || tx.status === 'APPROVED') {
          totalWithdrawn += Number(tx.amount);
        }
      }
    }

    const availableBalance = totalEarned - pendingWithdrawals - totalWithdrawn;

    if (amount > availableBalance) {
      res.status(400).json({ error: 'Insufficient Funds' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      const withdrawal = await tx.withdrawal.create({
        data: {
          memberId: decoded.memberId,
          walletId: wallet.id,
          requestedAmount: amount,
          status: 'REQUESTED'
        }
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          withdrawalId: withdrawal.id,
          transactionType: 'DEBIT_WITHDRAWAL',
          status: 'PENDING',
          amount: amount,
          balanceAfter: availableBalance - amount,
          idempotencyKey: `WD-${withdrawal.id}`
        }
      });
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

