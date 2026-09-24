import { Prisma, BookingStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../db';
import { BookingStateMachineService } from '../modules/booking/BookingStateMachine';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

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
//
// Three distinct financial flows, each in its own atomic transaction:
//   1. DIRECT REWARD  (TP) → credited to the immediate sponsor's wallet
//   2. BINARY VOLUME  (BV) → rolled up the binary tree via BinaryVolumeEngine
//   3. TEAM BONUS     (TP) → distributed to the next 5 *qualified* uplines.
//      Qualification = at least 1 confirmed booking.
//      Unqualified uplines are SKIPPED (compressed upward).
//      Traversal continues until exactly 5 qualified uplines are paid
//      (or the tree is exhausted). Each qualified recipient gets teamBonusTP / 5.
// ---------------------------------------------------------------------------
export const assignManualPoints = async (req: Request, res: Response): Promise<void> => {
  const { memberId, directRewardTP, binaryVolumeBV, teamBonusTP, notes } = req.body;

  if (!memberId) {
    res.status(400).json({ error: 'memberId is required.' });
    return;
  }

  const safeNotes = notes || 'Admin Manual Assignment';

  try {
    // ── STEP 1: DIRECT REWARD → Sponsor's wallet ──────────────────────────
    if (Number(directRewardTP) > 0) {
      await prisma.$transaction(async (tx) => {
        const directReferral = await tx.referral.findFirst({
          where: { referredMemberId: memberId, isValid: true },
          include: { referrerMember: { include: { wallet: true } } }
        });
        const sponsor = directReferral?.referrerMember;

        if (sponsor?.wallet) {
          const balResult = await tx.$queryRaw<{ available: number }[]>`
            SELECT
              COALESCE(SUM(CASE WHEN "transactionType"::text LIKE 'CREDIT_%' AND status::text = 'AVAILABLE' THEN amount ELSE 0 END), 0) -
              COALESCE(SUM(CASE WHEN "transactionType"::text LIKE 'DEBIT_%'  AND status::text IN ('PENDING','APPROVED','PAID') THEN amount ELSE 0 END), 0)
            AS available
            FROM wallet_transactions WHERE "walletId" = ${sponsor.wallet.id}::uuid
          `;
          const currentBalance = new Prisma.Decimal(balResult[0]?.available ?? 0);
          const rewardAmount   = new Prisma.Decimal(directRewardTP);

          await tx.walletTransaction.create({
            data: {
              walletId:        sponsor.wallet.id,
              transactionType: 'CREDIT_DIRECT_REWARD',
              status:          'AVAILABLE',
              amount:          rewardAmount,
              balanceAfter:    currentBalance.plus(rewardAmount),
              notes:           `Manual Direct Bonus: ${safeNotes}`,
              idempotencyKey:  `DR-${Date.now()}-${uuidv4().slice(0, 8)}`,
            }
          });

          console.log(`[assignManualPoints] Direct Reward ${directRewardTP} TP → sponsor ${sponsor.id}`);
        } else {
          console.warn(`[assignManualPoints] No sponsor found for member ${memberId}. Direct reward skipped.`);
        }
      });
    }

    // ── STEP 2: BINARY VOLUME → Tree roll-up (engine owns its transaction) ─
    if (Number(binaryVolumeBV) > 0) {
      const { BinaryVolumeEngine } = await import('../modules/financial/BinaryVolumeEngine');
      const engine = new BinaryVolumeEngine(prisma);
      await engine.rollUpVolume(null as any, memberId, new Prisma.Decimal(binaryVolumeBV));
      console.log(`[assignManualPoints] Binary Volume ${binaryVolumeBV} BV rolled up from member ${memberId}`);
    }

    // ── STEP 3: TEAM BONUS → Compressed 5-qualified-upline roll-up ────────
    // Walk upward, skip unqualified nodes, pay the next 5 qualified ones.
    if (Number(teamBonusTP) > 0) {
      await prisma.$transaction(async (tx) => {
        const cutPerLevel = new Prisma.Decimal(Number(teamBonusTP) / 5);
        let currentId: string | null = memberId;
        let paidCount = 0;

        while (currentId && paidCount < 5) {
          const referral = await tx.referral.findFirst({
            where: { referredMemberId: currentId, isValid: true }
          });
          const sponsorId = referral?.referrerMemberId ?? null;
          if (!sponsorId) break; // reached root of tree

          // Qualification gate: ≥1 confirmed booking
          const bookingCount = await tx.booking.count({
            where: {
              memberId: sponsorId,
              status: { in: ['BOOKING_CONFIRMED', 'TRAVEL_UPCOMING', 'TRAVELING', 'COMPLETED'] }
            }
          });

          if (bookingCount > 0) {
            const uplineWallet = await tx.wallet.findUnique({ where: { memberId: sponsorId } });

            if (uplineWallet) {
              const balResult = await tx.$queryRaw<{ available: number }[]>`
                SELECT
                  COALESCE(SUM(CASE WHEN "transactionType"::text LIKE 'CREDIT_%' AND status::text = 'AVAILABLE' THEN amount ELSE 0 END), 0) -
                  COALESCE(SUM(CASE WHEN "transactionType"::text LIKE 'DEBIT_%'  AND status::text IN ('PENDING','APPROVED','PAID') THEN amount ELSE 0 END), 0)
                AS available
                FROM wallet_transactions WHERE "walletId" = ${uplineWallet.id}::uuid
              `;
              const bal = new Prisma.Decimal(balResult[0]?.available ?? 0);

              await tx.walletTransaction.create({
                data: {
                  walletId:        uplineWallet.id,
                  transactionType: 'CREDIT_TEAM_REWARD',
                  status:          'AVAILABLE',
                  amount:          cutPerLevel,
                  balanceAfter:    bal.plus(cutPerLevel),
                  notes:           `Manual Team Bonus (Qualified Upline ${paidCount + 1}/5): ${safeNotes}`,
                  idempotencyKey:  `TB-Q${paidCount + 1}-${Date.now()}-${uuidv4().slice(0, 8)}`,
                }
              });

              paidCount++;
              console.log(`[assignManualPoints] Team Bonus ${cutPerLevel} TP → qualified upline ${paidCount}/5 (member ${sponsorId})`);
            }
          } else {
            console.log(`[assignManualPoints] Upline ${sponsorId} unqualified — compressing upward.`);
          }

          currentId = sponsorId; // advance up the tree regardless of qualification
        }

        if (paidCount < 5) {
          console.warn(`[assignManualPoints] Team bonus: only ${paidCount}/5 qualified uplines found.`);
        }
      });
    }

    // ── STEP 4: AUDIT LOG (immutable record) ──────────────────────────────
    await prisma.auditLog.create({
      data: {
        action:   'ADMIN_ACTION',
        entity:   'members',
        entityId: memberId,
        metadata: { directRewardTP, binaryVolumeBV, teamBonusTP, notes: safeNotes },
      }
    });

    res.status(200).json({ success: true, message: 'Points distributed securely.' });

  } catch (error: any) {
    console.error('[assignManualPoints] Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Transaction failed. Points rolled back.' });
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
