import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { BookingStateMachineService } from '../modules/booking/BookingStateMachine';
import { PrismaClient, BookingStatus } from '@prisma/client';

export const bookingsRouter = Router();

const createBookingSchema = z.object({
  quoteId: z.string().uuid(),
  memberId: z.string().uuid().optional(),
});

bookingsRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createBookingSchema.parse(req.body);

    const quote = await prisma.quote.findUnique({
      where: { id: data.quoteId },
      include: { package: { include: { prices: { where: { isActive: true }, take: 1 } } } }
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
        directRewardBudget: 0, 
        teamRewardBudget: 0,
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
