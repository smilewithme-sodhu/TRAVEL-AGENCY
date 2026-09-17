import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { DESTINATION_PACKAGES } from '../src/data/packageData.js';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/travel_agency_test";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting DB Seed...');

  // 1. Create a mock Admin User to satisfy 'createdBy' relationships
  const adminId = '11111111-1111-1111-1111-111111111111';
  await prisma.adminUser.upsert({
    where: { id: adminId },
    update: {},
    create: {
      id: adminId,
      email: 'admin@wanderlust.travel',
      passwordHash: 'hashed_pw',
      name: 'System Admin',
      role: 'SUPER_ADMIN',
    },
  });

  // 2. Loop through the frontend packages
  for (const pkg of DESTINATION_PACKAGES) {
    console.log(`Processing: ${pkg.name}...`);
    
    // Check if Destination exists
    let destination = await prisma.destination.findFirst({
      where: { name: pkg.name }
    });

    if (!destination) {
      destination = await prisma.destination.create({
        data: {
          slug: pkg.id,
          name: pkg.name,
          country: pkg.location || 'Unknown',
          description: pkg.description,
          status: 'ACTIVE',
        }
      });
    }

    // Check if Package exists
    let dbPackage = await prisma.package.findFirst({
      where: { slug: pkg.id }
    });

    if (!dbPackage) {
      dbPackage = await prisma.package.create({
        data: {
          destinationId: destination.id,
          slug: pkg.id,
          name: pkg.name,
          packageType: pkg.category.toUpperCase() === 'DOMESTIC' ? 'DOMESTIC' : 'INTERNATIONAL',
          durationNights: parseInt(pkg.duration.split(' ')[0]) || 4,
          maxTravellers: 10,
          highlights: pkg.highlights.map(h => h.title),
          inclusions: pkg.inclusions || [],
          exclusions: pkg.exclusions || [],
          cancellationPolicy: 'Standard cancellation applies.',
          status: 'PUBLISHED',
        }
      });

      // Derive costs from their frontend prices (mock logic)
      // e.g. price is 35000
      const sellingPrice = pkg.price || 35000;
      const supplierCost = sellingPrice * 0.7; 
      const operationalCost = sellingPrice * 0.1;
      const taxAmount = sellingPrice * 0.05;
      const paymentCost = sellingPrice * 0.02;
      const grossContribution = sellingPrice - (supplierCost + operationalCost + taxAmount + paymentCost);

      await prisma.packagePrice.create({
        data: {
          packageId: dbPackage.id,
          validFrom: new Date(),
          validTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // +1 year
          supplierCost,
          operationalCost,
          paymentCost,
          taxAmount,
          sellingPrice,
          grossContribution,
          isActive: true,
          createdBy: adminId
        }
      });
    }
  }

  console.log('DB Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
