import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

export const memberRouter = Router();

import { getDecodedToken } from '../middleware/auth';

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

        // 1. Calculate Personal Volume (sum of volume from their own bookings)
    const personalVolume = member.bookings.reduce((sum: number, b: any) => sum + Number(b.binaryVolumeBudget || 0), 0);

    // 2. Calculate Team Volume (sum of binary volume rolled up to them)
    let teamVolume = 0;
    if (member.binaryNode?.id) {
      const volEvents = await prisma.binaryVolumeEvent.aggregate({
        _sum: { eligibleAmount: true },
        where: { binaryNodeId: member.binaryNode.id }
      });
      teamVolume = Number(volEvents._sum.eligibleAmount || 0);
    }

    // 3. Calculate Pending Rewards
    const pendingRewardsAgg = await prisma.reward.aggregate({
      _sum: { finalAmount: true },
      where: { memberId: member.id, status: 'PENDING' }
    });
    const pendingRewards = Number(pendingRewardsAgg._sum.finalAmount || 0);

        // Calculate Earned Rewards Breakdown
    const earnedRewards = await prisma.reward.findMany({
      where: {
        memberId: member.id,
        status: { in: ['APPROVED', 'AVAILABLE', 'PAID'] }
      },
      select: { rewardType: true, finalAmount: true }
    });
    
    let directBonus = 0;
      let teamBonus = 0;
      let binaryMatch = 0;
      
      earnedRewards.forEach(r => {
        const amt = Number(r.finalAmount || 0);
        if (r.rewardType === 'DIRECT') directBonus += amt;
        if (r.rewardType === 'TEAM') teamBonus += amt;
        if (r.rewardType === 'BINARY') binaryMatch += amt;
      });

      const globalBonusTransactions = await prisma.walletTransaction.aggregate({
        _sum: { amount: true },
        where: {
          walletId: member.wallet?.id,
          transactionType: 'CREDIT_MANUAL_ADJUSTMENT',
          status: 'AVAILABLE'
        }
      });
      const globalBonus = Number(globalBonusTransactions._sum.amount || 0);
      const totalEarned = directBonus + teamBonus + binaryMatch + globalBonus;

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
        personalVolume,
        teamVolume,
        activeDirectReferrals,
        upcomingTrips: member.bookings.filter((b: any) => b.status === 'TRAVEL_UPCOMING').length,
        pendingRewards,
          globalBonus,
          directBonus,
          teamBonus,
          binaryMatch,
          totalEarned,
          leftVolume: Number(member.binaryNode?.leftCarryForward || 0) + Number(member.binaryNode?.totalMatchedVolume || 0),
          rightVolume: Number(member.binaryNode?.rightCarryForward || 0) + Number(member.binaryNode?.totalMatchedVolume || 0),
          matchedVolume: Number(member.binaryNode?.totalMatchedVolume || 0),
          leftCarryForward: Number(member.binaryNode?.leftCarryForward || 0),
          rightCarryForward: Number(member.binaryNode?.rightCarryForward || 0),
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



