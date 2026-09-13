import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { z } from 'zod';

export const quotesRouter = Router();

const createQuoteSchema = z.object({
  packageId: z.string().uuid(),
  customerId: z.string().uuid(),
  referralId: z.string().uuid().optional(),
  travelDateFrom: z.string().datetime(),
  travelDateTo: z.string().datetime(),
  numTravellers: z.number().int().min(1),
  customizations: z.record(z.string(), z.any()).optional().nullable(),
});

quotesRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createQuoteSchema.parse(req.body);
    
    const pkg = await prisma.package.findUnique({
      where: { id: data.packageId },
      include: { prices: { where: { isActive: true }, take: 1 } }
    });

    if (!pkg || pkg.prices.length === 0) {
      res.status(404).json({ success: false, error: 'Package or active price not found' });
      return;
    }

    const price = pkg.prices[0];

    const quote = await prisma.quote.create({
      data: {
        packageId: data.packageId,
        customerId: data.customerId,
        referralId: data.referralId,
        travelDateFrom: new Date(data.travelDateFrom),
        travelDateTo: new Date(data.travelDateTo),
        numTravellers: data.numTravellers,
        customizations: data.customizations ? (data.customizations as any) : undefined,
        quotedPrice: price.sellingPrice,
        supplierCost: price.supplierCost,
        grossContribution: price.grossContribution,
        status: 'DRAFT',
        createdBy: data.customerId
      }
    });

    res.status(201).json({ success: true, data: quote });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, error: (err as any).errors });
      return;
    }
    next(err);
  }
});

quotesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const quote = await prisma.quote.findUnique({
      where: { id: id },
      include: { package: true }
    });

    if (!quote) {
      res.status(404).json({ success: false, error: 'Quote not found' });
      return;
    }

    res.status(200).json({ success: true, data: quote });
  } catch (err) {
    next(err);
  }
});
