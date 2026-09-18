import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

export const memberRouter = Router();

// ---------------------------------------------------------------------------
// Auth middleware â€” extracts memberId from Bearer JWT
// ---------------------------------------------------------------------------
const getDecodedToken = (req: Request): { userId: string; memberId: string } | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; memberId: string };
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// GET /api/member/dashboard
// Returns the authenticated member's profile, bookings overview, and network stats.
// ---------------------------------------------------------------------------
memberRouter.get('/dashboard', async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = getDecodedToken(req);
    if (!decoded?.memberId) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const member = await prisma.member.findUnique({
      where: { id: decoded.memberId },
      include: {
        user: true,
        wallet: {
          include: {
            transactions: {
              where: { status: 'AVAILABLE' },
              select: { amount: true, transactionType: true },
            },
          },
        },
        bookings: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            package: { include: { destination: true } },
          },
        },
        referralsGiven: {
          include: {
            referredMember: { select: { id: true, greenStatus: true } },
          },
        },
        binaryNode: true,
      },
    });

    if (!member) {
      res.status(404).json({ success: false, error: 'Member not found' });
      return;
    }

    // Calculate wallet balance from transactions
    const walletBalance = (member.wallet?.transactions ?? []).reduce((sum: number, tx: any) => {
      if (tx.transactionType.startsWith('CREDIT_')) return sum + Number(tx.amount);
      if (tx.transactionType.startsWith('DEBIT_')) return sum - Number(tx.amount);
      return sum;
    }, 0);

    const activeDirectReferrals = member.referralsGiven.filter(
      (r: any) => r.referredMember?.greenStatus === 'GREEN'
    ).length;

    const dashboardData = {
      member: {
        id: member.id,
        memberId: member.memberId,
        memberCode: member.referralCode,
        name: member.user.name,
        email: member.user.email,
        phone: member.user.phone ?? '',
        joinedDate: member.joinedAt.toISOString(),
        status: member.greenStatus ?? 'REGISTERED',
        walletBalance,
        binarySide: member.binaryNode?.side ?? null,
      },
      bookings: member.bookings.map((b: any) => ({
        bookingId: b.id,
        destination: b.package?.destination?.name ?? 'N/A',
        travelDate: b.travelDateFrom?.toISOString() ?? '',
        status: b.status,
        activeUntil: b.travelDateTo?.toISOString() ?? '',
      })),
      overview: {
        personalVolume: 0,
        teamVolume: 0,
        activeDirectReferrals,
        upcomingTrips: member.bookings.filter((b: any) => b.status === 'TRAVEL_UPCOMING').length,
        pendingRewards: 0,
      },
    };

    res.json({ success: true, data: dashboardData });
  } catch (error: any) {
    console.error('[GET /api/member/dashboard]', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/member/referrals
// Returns direct referrals for the authenticated member.
// ---------------------------------------------------------------------------
memberRouter.get('/referrals', async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = getDecodedToken(req);
    if (!decoded?.memberId) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const referrals = await prisma.referral.findMany({
      where: { referrerMemberId: decoded.memberId, referredMemberId: { not: null } },
      include: { 
        referredMember: { 
          include: { 
            user: { select: { name: true, email: true } } 
          } 
        } 
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: referrals.map((r: any) => ({
        id: r.referredMember?.id,
        memberId: r.referredMember?.memberId,
        name: r.referredMember?.user?.name,
        email: r.referredMember?.user?.email,
        status: r.referredMember?.greenStatus ?? 'REGISTERED',
        joinedAt: r.referredMember?.joinedAt?.toISOString() ?? r.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error('[GET /api/member/referrals]', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/member/profile
// Updates name/phone for the authenticated member's user record.
// ---------------------------------------------------------------------------
memberRouter.put('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = getDecodedToken(req);
    if (!decoded?.memberId) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const { name, phone } = req.body;

    const member = await prisma.member.findUnique({ where: { id: decoded.memberId } });
    if (!member) {
      res.status(404).json({ success: false, error: 'Member not found' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        ...(name ? { name } : {}),
        ...(phone ? { phone } : {}),
      },
    });

    res.json({ success: true, data: { name: updated.name, phone: updated.phone } });
  } catch (error: any) {
    console.error('[PUT /api/member/profile]', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});
