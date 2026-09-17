import { Prisma, BookingStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../db';
import { BookingStateMachineService } from '../modules/booking/BookingStateMachine';
import { randomUUID } from 'crypto';

const bookingService = new BookingStateMachineService(prisma);

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        member: {
          include: {
            user: {
              select: { name: true, email: true, phone: true }
            }
          }
        },
        package: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: bookings });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const confirmBookingWithPoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { adminNotes } = req.body;

    await bookingService.transition(
      id,
      BookingStatus.BOOKING_CONFIRMED,
      (req as any).user?.id ?? 'ADMIN',
      { source: 'admin-manual', adminNotes: adminNotes ?? '' }
    );

    res.json({ success: true, message: 'Booking confirmed' });
  } catch (error: any) {
    console.error('Error confirming booking:', error);
    res.status(400).json({ error: error.message || 'Failed to confirm booking' });
  }
};

// ---------------------------------------------------------------------------
// POST /api/admin/members/assign-points
// Assigns manual direct cash reward & binary volume to a member.
// ---------------------------------------------------------------------------
export const assignManualPoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId, amountPaid, binaryVolume, notes } = req.body;

    if (!memberId) {
      res.status(400).json({ error: 'memberId is required.' });
      return;
    }

    const directReward = new Prisma.Decimal(amountPaid || 0);
    const volume = new Prisma.Decimal(binaryVolume || 0);
    const safeNotes = notes || 'Admin Manual Assignment';

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { user: true }
    });

    if (!member) {
      res.status(404).json({ error: 'Member not found.' });
      return;
    }

    // Ensure wallet exists
    let wallet = await prisma.wallet.findUnique({ where: { memberId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { memberId, currency: 'INR' }
      });
    }

    const now = new Date();

    // 1. Give money directly to wallet
    if (directReward.greaterThan(0)) {
      await prisma.$transaction(async (tx) => {
        const balanceResult = await tx.$queryRaw<{ available: number }[]>`
          SELECT
            COALESCE(SUM(CASE
              WHEN "transactionType" LIKE 'CREDIT_%' AND status = 'AVAILABLE'
              THEN amount ELSE 0
            END), 0) -
            COALESCE(SUM(CASE
              WHEN "transactionType" LIKE 'DEBIT_%' AND status IN ('PENDING', 'APPROVED', 'PAID')
              THEN amount ELSE 0
            END), 0) AS available
          FROM wallet_transactions
          WHERE "walletId" = ${wallet!.id}::uuid
        `;
        const currentBalance = new Prisma.Decimal(balanceResult[0]?.available || 0);
        const newBalance = currentBalance.plus(directReward);

        await tx.walletTransaction.create({
          data: {
            walletId: wallet!.id,
            transactionType: 'CREDIT_MANUAL_ADJUSTMENT',
            status: 'AVAILABLE',
            amount: directReward,
            balanceAfter: newBalance,
            notes: safeNotes,
            idempotencyKey: `MANUAL-${Date.now()}-${randomUUID().slice(0,6)}`,
            createdAt: now
          }
        });
      });
    }

    // 2. Add Binary Volume (runs its own transaction inside)
    if (volume.greaterThan(0)) {
      const { BinaryVolumeEngine } = await import('../modules/financial/BinaryVolumeEngine');
      const binaryEngine = new BinaryVolumeEngine(prisma);
      const dummyId = null as any; 
      await binaryEngine.rollUpVolume(dummyId, memberId, volume);
    }

    // 3. Activate member
    await prisma.member.update({
      where: { id: memberId },
      data: {
        greenStatus: 'GREEN',
        greenActivatedAt: now,
        greenExpiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      message: `Successfully assigned ${amountPaid || 0} INR and ${binaryVolume || 0} BV to ${member.user.name}.`
    });

  } catch (error: any) {
    console.error('[assignManualPoints] Error:', error);
    res.status(500).json({ error: error.message || 'Failed to assign points.' });
  }
};


// ---------------------------------------------------------------------------
// GET /api/admin/members/search?q=<term>
// Lightweight member search by name, email, username or referral code.
// ---------------------------------------------------------------------------
export const searchMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = String(req.query.q ?? '').trim();
    if (q.length < 2) {
      res.json({ success: true, data: [] });
      return;
    }

    const members = await prisma.member.findMany({
      where: {
        OR: [
          { user: { name:  { contains: q, mode: 'insensitive' } } },
          { user: { email: { contains: q, mode: 'insensitive' } } },
          { referralCode: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: {
        user: { select: { name: true, email: true } },
      },
      take: 10,
    });

    res.json({ success: true, data: members });
  } catch (error: any) {
    console.error('[searchMembers] Error:', error);
    res.status(500).json({ error: 'Member search failed.' });
  }
};

