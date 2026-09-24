const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let pkg = await prisma.package.findFirst({ where: { slug: 'whatsapp-custom' } });
  if (!pkg) {
    pkg = await prisma.package.create({
      data: {
        slug: 'whatsapp-custom',
        title: 'Custom WhatsApp Booking',
        description: 'Placeholder package for manual WhatsApp bookings',
        basePrice: 0,
        currency: 'INR',
        destinations: ['Custom'],
        durationDays: 1,
        durationNights: 0,
        status: 'PUBLISHED',
        highlights: [],
        itinerary: [],
        inclusions: [],
        exclusions: [],
        images: [],
        prices: {
          create: {
            title: 'Custom Price',
            amount: 0,
            currency: 'INR',
            commissionableVolume: 0
          }
        }
      }
    });
    console.log("Created fallback WhatsApp package.");
  } else {
    console.log("Fallback package already exists.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
