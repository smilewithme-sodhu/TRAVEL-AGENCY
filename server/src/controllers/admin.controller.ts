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
