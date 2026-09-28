import { prisma } from '../db';
import { DESTINATION_PACKAGES } from './packageData';
import { PackageStatus } from '@prisma/client';

async function seedPackages() {
  console.log('Seeding packages...');
  
  const adminUser = await prisma.adminUser.findFirst();
  const createdBy = adminUser ? adminUser.userId : '00000000-0000-0000-0000-000000000000';

  for (const pkgData of DESTINATION_PACKAGES) {
    // Check if destination exists
    let dest = await prisma.destination.findUnique({ where: { slug: pkgData.id } });
    if (!dest) {
      dest = await prisma.destination.create({
        data: {
          name: pkgData.name,
          slug: pkgData.id,
          country: pkgData.location,
          description: pkgData.tagline,
        }
      });
    }

    // Check if package exists
    let pkg = await prisma.package.findUnique({ where: { slug: pkgData.id } });
    if (!pkg) {
      pkg = await prisma.package.create({
        data: {
          name: pkgData.name,
          slug: pkgData.id,
          packageType: pkgData.category.toUpperCase() === 'DOMESTIC' ? 'DOMESTIC' : 'INTERNATIONAL',
          destinationId: dest.id,
          durationNights: parseInt(pkgData.duration?.split(' ')[0] || '5'),
          maxTravellers: 10,
          status: PackageStatus.ACTIVE,
          cancellationPolicy: pkgData.description,
          highlights: pkgData.highlights ? pkgData.highlights.map((h: any) => h.title) : [],
          inclusions: pkgData.inclusions || [],
          exclusions: pkgData.exclusions || []
        }
      });
      
      // Create price
      await prisma.packagePrice.create({
        data: {
          packageId: pkg.id,
          validFrom: new Date(),
          supplierCost: 500,
          operationalCost: 100,
          paymentCost: 50,
          taxAmount: 50,
          sellingPrice: pkgData.price || 1000,
          grossContribution: 200,
          directRewardBudget: 50,
          teamRewardBudget: 50,
          binaryVolumeBudget: 100,
          createdBy
        }
      });
      console.log(`Created package: ${pkgData.name}`);
    } else {
      console.log(`Package ${pkgData.name} already exists.`);
    }
  }
  
  console.log('Done seeding packages.');
}

seedPackages()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
