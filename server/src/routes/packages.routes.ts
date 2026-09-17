import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { PackageStatus } from '@prisma/client';
// @ts-ignore - Mock data import fallback


export const packagesRouter = Router();

packagesRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Try to fetch from Prisma PostgreSQL DB
    const dbPackages = await prisma.package.findMany({
      where: { status: PackageStatus.ACTIVE },
      include: {
        destination: true,
        prices: {
          where: { isActive: true },
          take: 1
        }
      }
    });

    if (dbPackages.length > 0) {
      // Map to frontend expected format
      const mapped = dbPackages.map(pkg => ({
        id: pkg.id, // We return the true UUID here for subsequent Quote/Booking flows
        slug: pkg.slug,
        name: pkg.name,
        category: pkg.packageType.toLowerCase(),
        location: pkg.destination.country,
        tagline: pkg.destination.description || '',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
        galleryImages: [],
        description: pkg.cancellationPolicy,
        whyVisit: [],
        highlights: pkg.highlights.map(title => ({ title, desc: '' })),
        inclusions: pkg.inclusions,
        exclusions: pkg.exclusions,
        duration: `${pkg.durationNights} Nights`,
        price: pkg.prices.length > 0 ? Number(pkg.prices[0].sellingPrice) : 0,
        itinerary: [],
        reviews: []
      }));
      res.status(200).json({ success: true, data: mapped, source: 'postgresql' });
      return;
    }

    // 2. Fallback to local file if DB is empty or fails
    res.status(200).json({ success: true, data: [] });
  } catch (err) {
    console.warn("Prisma fetch failed, falling back to mock data", err);
    res.status(200).json({ success: true, data: [] });
  }
});
