import { BinaryVolumeEngine } from '../modules/financial/BinaryVolumeEngine';
import { TeamBonusEngine } from '../modules/financial/TeamBonusEngine';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../db';

export const getPendingPayouts = async (req: Request, res: Response) => {
  try {
    const payouts = await prisma.withdrawal.findMany({
      where: {
        status: 'REQUESTED',
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
            bankAccounts: {
              where: {
                isPrimary: true,
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json({ success: true, data: payouts });
  } catch (error: any) {
    console.error('Error fetching pending payouts:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const approvePayout = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { adminNotes, gatewayRef } = req.body;

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id },
    });

    if (!withdrawal) {
      res.status(404).json({ success: false, error: 'Payout request not found' });
      return;
    }

    if (withdrawal.status !== 'REQUESTED') {
      res.status(400).json({ success: false, error: 'Invalid payout request state' });
      return;
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id },
        data: {
          status: 'PAID',
          gatewayRef: gatewayRef || null,
          reviewNotes: adminNotes || null,
          approvedAmount: withdrawal.requestedAmount,
          netPayoutAmount: Number(withdrawal.requestedAmount) - Number(withdrawal.tdsAmount),
          approvedAt: new Date(),
          paidAt: new Date()
        },
      });

      // Find the associated WalletTransaction
      const walletTx = await tx.walletTransaction.findFirst({
        where: { withdrawalId: id }
      });

      if (walletTx) {
         await tx.walletTransaction.update({
           where: { id: walletTx.id },
           data: {
             status: 'PAID',
             notes: adminNotes || walletTx.notes
           }
         });
      }

      return updatedWithdrawal;
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error approving payout:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const rejectPayout = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      res.status(400).json({ success: false, error: 'rejectionReason is required' });
      return;
    }

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id },
    });

    if (!withdrawal) {
      res.status(404).json({ success: false, error: 'Payout request not found' });
      return;
    }

    if (withdrawal.status !== 'REQUESTED') {
      res.status(400).json({ success: false, error: 'Invalid payout request state' });
      return;
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id },
        data: {
          status: 'REJECTED',
          rejectionReason,
          rejectedAt: new Date(),
          reviewedAt: new Date()
        },
      });

      const walletTx = await tx.walletTransaction.findFirst({
        where: { withdrawalId: id }
      });

      if (walletTx) {
         await tx.walletTransaction.update({
           where: { id: walletTx.id },
           data: {
             status: 'FAILED',
             notes: rejectionReason
           }
         });
      }

      return updatedWithdrawal;
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error rejecting payout:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const {
      destinationId, slug, name, packageType, durationNights, maxTravellers,
      highlights, inclusions, exclusions, cancellationPolicy, status,
      sellingPrice, directRewardBudget, teamRewardBudget, binaryVolumeBudget
    } = req.body;

    const newPackage = await prisma.package.create({
      data: {
        destinationId,
        slug,
        name,
        packageType: packageType || 'STANDARD',
        durationNights: Number(durationNights) || 1,
        maxTravellers: Number(maxTravellers) || 2,
        highlights: highlights || [],
        inclusions: inclusions || [],
        exclusions: exclusions || [],
        cancellationPolicy: cancellationPolicy || '',
        status: status || 'DRAFT',
        prices: {
          create: {
            validFrom: new Date(),
            supplierCost: 0,
            operationalCost: 0,
            paymentCost: 0,
            taxAmount: 0,
            grossContribution: 0,
            sellingPrice: new Prisma.Decimal(sellingPrice || 0),
            directRewardBudget: new Prisma.Decimal(directRewardBudget || 0),
            teamRewardBudget: new Prisma.Decimal(teamRewardBudget || 0),
            binaryVolumeBudget: new Prisma.Decimal(binaryVolumeBudget || 0),
            createdBy: '00000000-0000-0000-0000-000000000000', // admin user id placeholder
          }
        }
      },
      include: { prices: true }
    });

    res.json({ success: true, data: newPackage });
  } catch (error: any) {
    console.error('Error creating package:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const {
      destinationId, slug, name, packageType, durationNights, maxTravellers,
      highlights, inclusions, exclusions, cancellationPolicy, status,
      sellingPrice, directRewardBudget, teamRewardBudget, binaryVolumeBudget
    } = req.body;

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...(destinationId && { destinationId }),
        ...(slug && { slug }),
        ...(name && { name }),
        ...(packageType && { packageType }),
        ...(durationNights !== undefined && { durationNights: Number(durationNights) }),
        ...(maxTravellers !== undefined && { maxTravellers: Number(maxTravellers) }),
        ...(highlights && { highlights }),
        ...(inclusions && { inclusions }),
        ...(exclusions && { exclusions }),
        ...(cancellationPolicy && { cancellationPolicy }),
        ...(status && { status }),
      }
    });

    // Optionally update price and budgets if provided
    if (sellingPrice !== undefined || directRewardBudget !== undefined) {
      await prisma.packagePrice.updateMany({
        where: { packageId: id, isActive: true },
        data: {
          ...(sellingPrice !== undefined && { sellingPrice: new Prisma.Decimal(sellingPrice) }),
          ...(directRewardBudget !== undefined && { directRewardBudget: new Prisma.Decimal(directRewardBudget) }),
          ...(teamRewardBudget !== undefined && { teamRewardBudget: new Prisma.Decimal(teamRewardBudget) }),
          ...(binaryVolumeBudget !== undefined && { binaryVolumeBudget: new Prisma.Decimal(binaryVolumeBudget) })
        }
      });
    }

    res.json({ success: true, data: updatedPackage });
  } catch (error: any) {
    console.error('Error updating package:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    
    // Soft delete via status ARCHIVED
    const deleted = await prisma.package.update({
      where: { id },
      data: { status: 'ARCHIVED' }
    });

    res.json({ success: true, data: deleted });
  } catch (error: any) {
    console.error('Error deleting package:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await prisma.package.findMany({
      where: { status: { not: 'ARCHIVED' } },
      include: {
        destination: true,
        prices: {
          where: { isActive: true },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: packages });
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
export const injectWhatsAppBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId, amountPaid, binaryPoints, teamBonusPoints, directBonusPoints } = req.body;

    if (!memberId) {
      res.status(400).json({ error: 'Member ID is required.' });
      return;
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { user: true }
    });

    if (!member) {
      res.status(404).json({ error: 'Member not found.' });
      return;
    }

    const bookingRef = `WA-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    
    // We need ANY valid package to satisfy constraints. For manual WhatsApp injections, it's just a proxy.
    const fallbackPackage = await prisma.packagePrice.findFirst({ include: { package: true } });
    if (!fallbackPackage) {
      res.status(500).json({ error: 'No packages found in DB to attach this booking to. Please create at least one package in the admin panel first.' });
      return;
    }

    const bookingResult = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          bookingRef,
          customerId: member.userId,
          memberId: member.id,
          packageId: fallbackPackage.packageId,
          packagePriceId: fallbackPackage.id,
          travelDateFrom: new Date(),
          travelDateTo: new Date(),
          numTravellers: 1,
          sellingPrice: amountPaid || 0,
          supplierCost: 0,
          operationalCost: 0,
          paymentCost: 0,
          taxAmount: 0,
          grossContribution: amountPaid || 0,
          directRewardBudget: directBonusPoints || 0,
          teamRewardBudget: teamBonusPoints || 0,
          binaryVolumeBudget: binaryPoints || 0,
          refundReserveBudget: 0,
          netContribution: amountPaid || 0,
          status: 'BOOKING_CONFIRMED'
        }
      });

              // Member has bought a package, upgrade them to ORANGE (Travel Agent)
        await tx.member.update({
          where: { id: member.id },
          data: { greenStatus: 'ORANGE' }
        });

        if (Number(directBonusPoints) > 0) {
        let sponsorMemberId: string | null = null;
        const referral = await tx.referral.findFirst({
          where: { referredMemberId: member.id, isValid: true }
        });
        if (referral) {
          sponsorMemberId = referral.referrerMemberId;
        }

                  // Enforce Blueprint Rule: Sponsor must be GREEN or ORANGE to receive direct bonus
          const sponsorMember = sponsorMemberId ? await tx.member.findUnique({ where: { id: sponsorMemberId } }) : null;
          if (sponsorMemberId && sponsorMember && (sponsorMember.greenStatus === 'GREEN' || sponsorMember.greenStatus === 'ORANGE')) {
            let sponsorWallet = await tx.wallet.findUnique({ where: { memberId: sponsorMemberId } });
          if (!sponsorWallet) {
             sponsorWallet = await tx.wallet.create({ data: { memberId: sponsorMemberId, currency: 'INR' } });
          }
          await tx.walletTransaction.create({
            data: {
              walletId: sponsorWallet.id,
              transactionType: 'CREDIT_DIRECT_REWARD',
              amount: Number(directBonusPoints),
              status: 'AVAILABLE',
              notes: `WhatsApp Booking Direct Bonus: ${bookingRef}`,
              balanceAfter: 0,
              idempotencyKey: `INJECT-DIRECT-${booking.id}`
            }
          });
        }
      }

      if (Number(teamBonusPoints) > 0) {
        const teamEngine = new TeamBonusEngine();
        await teamEngine.distributeTeamBonus(
          tx as Prisma.TransactionClient,
          booking.id,
          member.id,
          new Prisma.Decimal(teamBonusPoints),
          'whatsapp-injection'
        );
      }

      return booking;
    });

    if (Number(binaryPoints) > 0) {
      const binaryEngine = new BinaryVolumeEngine(prisma as any);
      await binaryEngine.rollUpVolume(
        bookingResult.id,
        member.id,
        new Prisma.Decimal(binaryPoints)
      );
    }

    res.status(200).json({ success: true, bookingId: bookingResult.id, bookingRef });
  } catch (error: any) {
    console.error('WhatsApp Booking Injection Error:', error);
    res.status(500).json({ error: error.message || 'Failed to inject booking.' });
  }
};



export const activateMemberToGreen = async (req: Request, res: Response): Promise<void> => {
    try {
      const { memberId } = req.body;
      const member = await prisma.member.findUnique({ where: { id: memberId } });
      if (!member) { res.status(404).json({ error: 'Member not found.' }); return; }
      await prisma.member.update({ where: { id: member.id }, data: { greenStatus: 'GREEN' } });
      res.json({ success: true, message: 'Member successfully upgraded to GREEN (Direct Bonus Qualified).' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const activateMemberToOrange = async (req: Request, res: Response): Promise<void> => {
    try {
      const { memberId } = req.body;
      const member = await prisma.member.findUnique({ where: { id: memberId } });
      if (!member) { res.status(404).json({ error: 'Member not found.' }); return; }
      await prisma.member.update({ where: { id: member.id }, data: { greenStatus: 'ORANGE' } });
      res.json({ success: true, message: 'Member successfully upgraded to ORANGE (Travel Agent, Binary/Team Qualified).' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };



export const distributeGlobalBonus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { totalEarnings } = req.body;
    if (!totalEarnings || isNaN(totalEarnings)) {
      res.status(400).json({ error: 'Valid totalEarnings is required.' });
      return;
    }

    const poolAmount = Number(totalEarnings) * 0.10;

    const eligibleMembers = await prisma.member.findMany({
      where: { greenStatus: 'ORANGE' },
      include: { wallet: true }
    });

    if (eligibleMembers.length === 0) {
      res.status(400).json({ error: 'No ORANGE members eligible for the bonus.' });
      return;
    }

    const sharePerMember = poolAmount / eligibleMembers.length;

    await prisma.$transaction(async (tx) => {
      for (const member of eligibleMembers) {
        let walletId = member.wallet?.id;
        if (!walletId) {
          const newWallet = await tx.wallet.create({ data: { memberId: member.id, currency: 'INR' } });
          walletId = newWallet.id;
        }

        await tx.walletTransaction.create({
          data: {
            walletId,
            transactionType: 'CREDIT_MANUAL_ADJUSTMENT',
            amount: sharePerMember,
            status: 'AVAILABLE',
            notes: `Global Revenue Pool Share (10% of ${totalEarnings} evenly split among ${eligibleMembers.length} agents)`,
            balanceAfter: 0,
            idempotencyKey: `GLOBAL-${Date.now()}-${member.id}`
          }
        });
      }
    });

    res.json({
      success: true,
      message: `Successfully distributed ${sharePerMember.toFixed(2)} to ${eligibleMembers.length} ORANGE members.`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to distribute global bonus' });
  }
};


export const getAdminMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await prisma.member.findMany({
      include: { user: true, wallet: { include: { transactions: true } }, _count: { select: { referralsGiven: true } } }
    });
    const mapped = members.map(m => {
      let balance = 0;
      if (m.wallet && m.wallet.transactions) {
        balance = m.wallet.transactions.reduce((sum, tx) => {
          if (tx.transactionType.startsWith('CREDIT_')) return sum + Number(tx.amount || 0);
          if (tx.transactionType.startsWith('DEBIT_')) return sum - Number(tx.amount || 0);
          return sum;
        }, 0);
      }
      return {
        id: m.id,
        name: m.user?.name || 'Unknown',
        code: m.memberId || m.referralCode,
        status: m.greenStatus,
        directSales: m._count?.referralsGiven || 0,
        balance: balance,
        joined: m.joinedAt.toISOString().split('T')[0]
      };
    });
    res.json({ success: true, data: mapped });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

export const getAdminDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalPackages = await prisma.package.count();
    
      const activeMembers = await prisma.member.count({ where: { greenStatus: { in: ['GREEN', 'ORANGE'] } } });

    const pendingWithdrawals = await prisma.withdrawal.aggregate({ _sum: { requestedAmount: true }, where: { status: 'REQUESTED' } });
      const globalBonusTransactions = await prisma.walletTransaction.aggregate({ _sum: { amount: true }, where: { transactionType: 'CREDIT_MANUAL_ADJUSTMENT' } });
      res.json({ success: true, data: { totalPackages, activeMembers, pendingPayouts: Number(pendingWithdrawals._sum.requestedAmount || 0), totalGlobalBonus: Number(globalBonusTransactions._sum.amount || 0) } });
  } catch (error) {
    console.error("ADMIN METRICS ERROR:", error); res.status(500).json({ error: "Failed", details: (error as Error).message });
  }
};
