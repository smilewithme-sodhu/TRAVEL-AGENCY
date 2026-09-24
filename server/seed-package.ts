import { prisma } from './src/db';

async function seed() {
  const adminUser = await prisma.adminUser.findFirst();
  const createdBy = adminUser ? adminUser.userId : '00000000-0000-0000-0000-000000000000';
  
  const dest = await prisma.destination.create({
    data: { name: 'Test Dest', slug: 'test-dest', country: 'IN', description: 'desc' }
  });
  
  const pkg = await prisma.package.create({
    data: { name: 'Test Pkg', title: 'Test Pkg', slug: 'test-pkg', overview: 'desc', packageType: 'FIXED', destinationId: dest.id, createdBy }
  });

  const price = await prisma.packagePrice.create({
    data: { packageId: pkg.id, validFrom: new Date(), sellingPrice: 0, grossContribution: 0, directRewardBudget: 0, teamRewardBudget: 0, binaryVolumeBudget: 0, createdBy }
  });

  console.log('Created dummy package:', price.id);
}
seed().catch(console.error);
