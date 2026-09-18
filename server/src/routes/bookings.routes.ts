import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { BookingStateMachineService } from '../modules/booking/BookingStateMachine';
import { PrismaClient, BookingStatus } from '@prisma/client';

export const bookingsRouter = Router();


const checkoutSchema = z.object({
  packageId: z.string().uuid(),
  numTravellers: z.number().int().min(1),
  paymentUtr: z.string().min(3),
});

bookingsRouter.get('/packages', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const packages = await prisma.package.findMany({
      where: { status: 'ACTIVE' },
      include: { prices: { where: { isActive: true }, take: 1 }, destination: true }
    });
    res.status(200).json({ success: true, data: packages });
  } catch (err) {
    next(err);
  }
});

bookingsRouter.post('/checkout', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, memberId: string };
    
    if (!decoded.memberId) {
      res.status(400).json({ error: 'User is not a member' });
      return;
    }

    const data = checkoutSchema.parse(req.body);

    const travelPackage = await prisma.package.findUnique({
      where: { id: data.packageId },
      include: { prices: { where: { isActive: true }, take: 1 }, destination: true }
    });

    if (!travelPackage || travelPackage.prices.length === 0) {
      res.status(404).json({ success: false, error: 'Package or active price not found' });
      return;
    }

    const price = travelPackage.prices[0];
    const totalPrice = Number(price.sellingPrice || 0) * data.numTravellers;
    
    const bookingRef = `BK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const booking = await prisma.$transaction(async (tx) => {
      const b = await tx.booking.create({
        data: {
          bookingRef,
          customerId: decoded.userId,
          memberId: decoded.memberId,
          packageId: travelPackage.id,
          packagePriceId: price.id,
          travelDateFrom: new Date(), 
          travelDateTo: new Date(new Date().setDate(new Date().getDate() + travelPackage.durationNights)),
          numTravellers: data.numTravellers,
          sellingPrice: totalPrice,
          supplierCost: (Number(price.supplierCost) || 0) * data.numTravellers,
          paymentCost: (Number(price.paymentCost) || 0) * data.numTravellers,
          operationalCost: (Number(price.operationalCost) || 0) * data.numTravellers,
          taxAmount: (Number(price.taxAmount) || 0) * data.numTravellers,
          grossContribution: (Number(price.grossContribution) || 0) * data.numTravellers,
          directRewardBudget: (Number(price.directRewardBudget) || 0) * data.numTravellers,
          teamRewardBudget: (Number(price.teamRewardBudget) || 0) * data.numTravellers,
          binaryVolumeBudget: (Number(price.binaryVolumeBudget) || 0) * data.numTravellers,
          refundReserveBudget: 0,
          netContribution: 0,
          status: 'PAYMENT_PENDING'
        }
      });

      await tx.payment.create({
        data: {
          bookingId: b.id,
          amount: totalPrice,
          method: 'UPI',
          gatewayProvider: 'MANUAL',
          gatewayOrderId: data.paymentUtr + '-' + Date.now(),
          status: 'INITIATED'
        }
      });

      return b;
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: err.issues });
      return;
    }
    console.error('Checkout error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const createBookingSchema = z.object({
  quoteId: z.string().uuid(),
  memberId: z.string().uuid().optional(),
});

bookingsRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createBookingSchema.parse(req.body);

    const quote = await prisma.quote.findUnique({
      where: { id: data.quoteId },
      include: { package: { include: { prices: { where: { isActive: true }, take: 1 }, destination: true } } }
    });

    if (!quote) {
      res.status(404).json({ success: false, error: 'Quote not found' });
      return;
    }

    if (quote.status !== 'SENT' && quote.status !== 'DRAFT') {
      res.status(400).json({ success: false, error: 'Quote is not in a bookable state' });
      return;
    }

    const price = quote.package.prices[0];

    const bookingRef = `BK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        customerId: quote.customerId,
        memberId: data.memberId,
        packageId: quote.packageId,
        packagePriceId: price.id,
        quoteId: quote.id,
        referralId: quote.referralId,
        travelDateFrom: quote.travelDateFrom,
        travelDateTo: quote.travelDateTo,
        numTravellers: quote.numTravellers,
        sellingPrice: quote.quotedPrice,
        supplierCost: quote.supplierCost,
        paymentCost: price.paymentCost,
        operationalCost: price.operationalCost,
        taxAmount: price.taxAmount,
        grossContribution: quote.grossContribution,
        directRewardBudget: (Number(price.directRewardBudget) || 0) * quote.numTravellers,
        teamRewardBudget: (Number(price.teamRewardBudget) || 0) * quote.numTravellers,
        binaryVolumeBudget: 0,
        refundReserveBudget: 0,
        netContribution: quote.grossContribution,
        status: 'PAYMENT_PENDING'
      }
    });

    await prisma.quote.update({
      where: { id: quote.id },
      data: { status: 'ACCEPTED', acceptedAt: new Date() }
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: (err as any).errors });
      return;
    }
    next(err);
  }
});

bookingsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const booking = await prisma.booking.findUnique({
      where: { id: id },
      include: { package: true } 
    });

    if (!booking) {
      res.status(404).json({ success: false, error: 'Booking not found' });
      return;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
});

bookingsRouter.post('/:id/payment', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookingId = req.params.id as string;
    const stateMachine = new BookingStateMachineService(prisma as unknown as PrismaClient);
    const updatedBooking = await stateMachine.transition(
      bookingId, 
      BookingStatus.PAYMENT_RECEIVED, 
      "SYSTEM:payment_webhook", 
      { reason: 'mock_payment_endpoint' }
    ); 

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (err: any) {
    next(err);
  }
});

export const adminBookingsRouter = Router();

const confirmPointsSchema = z.object({
  overrideVolume: z.number().optional(),
  overrideDirectReward: z.number().optional(),
  adminNotes: z.string().optional(),
});

adminBookingsRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { package: true, member: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
    // Add customer data manually or just use member user if available
    const mapped = bookings.map(b => ({
      ...b,
      customer: b.member?.user || null
    }));
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    next(err);
  }
});

adminBookingsRouter.post('/:id/confirm-with-points', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookingId = req.params.id as string;
    const data = confirmPointsSchema.parse(req.body);
    
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true }
    });

    if (!booking) {
      res.status(404).json({ success: false, error: 'Booking not found' });
      return;
    }

    const resolvedVolume = data.overrideVolume ?? booking.binaryVolumeBudget;
    const resolvedDirectReward = data.overrideDirectReward ?? booking.directRewardBudget;

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        binaryVolumeBudget: resolvedVolume,
        directRewardBudget: resolvedDirectReward,
      }
    });

    const adminUserId = "SYSTEM:admin";

    const stateMachine = new BookingStateMachineService(prisma as unknown as PrismaClient);
    await stateMachine.transition(
      bookingId,
      BookingStatus.BOOKING_CONFIRMED,
      adminUserId,
      { reason: data.adminNotes || 'Admin confirmed payment' }
    );

    if (booking.memberId) {
      const { BinaryVolumeEngine } = await import('../modules/financial/BinaryVolumeEngine');
      const { Prisma } = await import('@prisma/client');
      const binaryVolumeEngine = new BinaryVolumeEngine(prisma as unknown as PrismaClient);
      
      await binaryVolumeEngine.rollUpVolume(booking.id, booking.memberId, new Prisma.Decimal(resolvedVolume));
    }

    res.status(200).json({ success: true, allocatedVolume: resolvedVolume });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: (err as any).errors });
      return;
    }
    next(err);
  }
});







