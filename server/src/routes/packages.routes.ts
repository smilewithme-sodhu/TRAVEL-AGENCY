import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { PackageStatus } from '@prisma/client';
import { getDecodedToken } from '../middleware/auth';

export const packagesRouter = Router();

packagesRouter.get('/active', async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = getDecodedToken(req);
    let hasBooked = false;

    if (decoded?.memberId) {
      const bookingCount = await prisma.booking.count({
        where: {
          memberId: decoded.memberId,
          status: { in: ['BOOKING_CONFIRMED', 'TRAVEL_UPCOMING', 'TRAVELING', 'COMPLETED'] }
        }
      });
      hasBooked = bookingCount > 0;
    }

    const packages = await prisma.package.findMany({
      where: { status: PackageStatus.ACTIVE },
      include: {
        destination: true,
        prices: {
          where: { isActive: true },
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    res.status(200).json({ success: true, data: { packages, memberStatus: { hasBooked } } });
  } catch (error) {
    console.error("Failed to fetch active packages:", error);
    res.status(500).json({ success: false, error: 'Failed to fetch packages' });
  }
});

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
