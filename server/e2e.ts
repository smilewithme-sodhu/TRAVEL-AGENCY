import { config } from 'dotenv';
config({ path: '../.env' });
import { prisma } from './src/db';
import { BinaryPlacementEngine } from './src/modules/network/BinaryPlacementEngine';
import { BookingStateMachineService } from './src/modules/booking/BookingStateMachine';
import { BookingStatus } from '@prisma/client';
import { BinaryVolumeEngine } from './src/modules/financial/BinaryVolumeEngine';
import { Prisma } from '@prisma/client';

async function runE2E() {
  console.log('--- STARTING E2E BOOKING FLOW ---');
  
  // 1. Get an Admin
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) throw new Error('No admin found');
  console.log(`[+] Admin verified: ${admin.email}`);

  // 2. Create a test user and member
  const sponsor = await prisma.member.findFirst();
  if (!sponsor) throw new Error('No sponsor found in DB to attach user to');
  
  const testEmail = `e2e_buyer_${Date.now()}@test.com`;
  
  const placementEngine = new BinaryPlacementEngine();
  const placement = await placementEngine.findSpilloverSlot(prisma, sponsor.id, 'LEFT');

  const buyer = await prisma.user.create({
    data: {
      email: testEmail,
      name: 'E2E Tester',
      phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      passwordHash: 'dummy',
      role: 'CUSTOMER',
      member: {
        create: {
          memberId: `TRV_E2E_${Math.floor(1000 + Math.random() * 9000)}`,
          referralCode: `trv_e2e_${Date.now()}`,
          binaryNode: {
            create: {
              parentId: placement.parentId,
              side: placement.position,
              depth: placement.parentDepth + 1,
              path: placement.parentPath + placement.parentId + '/'
            }
          },
          wallet: { create: {} }
        }
      }
    },
    include: { member: { include: { binaryNode: true } } }
  });

  // Update parent node
  if (placement.position === 'LEFT') {
    await prisma.binaryNode.update({ where: { id: placement.parentId }, data: { leftChildId: buyer.member!.binaryNode!.id } });
  } else {
    await prisma.binaryNode.update({ where: { id: placement.parentId }, data: { rightChildId: buyer.member!.binaryNode!.id } });
  }
  console.log(`[+] E2E Buyer Created & Placed on ${placement.position} leg of Parent ${placement.parentId}`);

  // 3. Admin creates a Package
  const pkg = await prisma.package.create({
    data: {
      name: 'E2E Test Journey',
      slug: `e2e-journey-${Date.now()}`,
      destinationId: (await prisma.destination.findFirst())?.id || '',
      status: 'ACTIVE',
      prices: {
        create: {
          sellingPrice: new Prisma.Decimal(5000),
          directRewardBudget: new Prisma.Decimal(500),
          teamRewardBudget: new Prisma.Decimal(1000),
          binaryVolumeBudget: new Prisma.Decimal(500) // 500 PV
        }
      }
    },
    include: { prices: true }
  });
  console.log(`[+] Package Created: ${pkg.name} | PV: ${pkg.prices[0].binaryVolumeBudget}`);

  // 4. Buyer creates a Quote
  const quote = await prisma.quote.create({
    data: {
      customerId: buyer.id,
      packageId: pkg.id,
      quotedPrice: pkg.prices[0].sellingPrice,
      supplierCost: new Prisma.Decimal(3000),
      grossContribution: new Prisma.Decimal(2000),
      travelDateFrom: new Date(),
      travelDateTo: new Date(Date.now() + 86400000 * 3),
      numTravellers: 1,
      status: 'SENT'
    }
  });
  console.log(`[+] Quote Created for Buyer. Quote ID: ${quote.id}`);

  // 5. Buyer accepts Quote -> Booking is created
  const bookingRef = `BK-E2E-${Date.now()}`;
  const booking = await prisma.booking.create({
    data: {
      bookingRef,
      customerId: buyer.id,
      memberId: buyer.member!.id,
      packageId: pkg.id,
      packagePriceId: pkg.prices[0].id,
      quoteId: quote.id,
      travelDateFrom: quote.travelDateFrom,
      travelDateTo: quote.travelDateTo,
      numTravellers: 1,
      sellingPrice: quote.quotedPrice,
      supplierCost: quote.supplierCost,
      paymentCost: 0,
      operationalCost: 0,
      taxAmount: 0,
      grossContribution: quote.grossContribution,
      directRewardBudget: pkg.prices[0].directRewardBudget,
      teamRewardBudget: pkg.prices[0].teamRewardBudget,
      binaryVolumeBudget: pkg.prices[0].binaryVolumeBudget,
      refundReserveBudget: 0,
      netContribution: quote.grossContribution,
      status: 'PAYMENT_PENDING'
    }
  });
  console.log(`[+] Booking Created! Status: PAYMENT_PENDING | ID: ${booking.bookingRef}`);

  // 6. Buyer pays -> State Machine handles transitions
  const stateMachine = new BookingStateMachineService(prisma);
  await stateMachine.transition(booking.id, BookingStatus.PAYMENT_RECEIVED, 'PAYMENT_GATEWAY', { reason: 'Credit Card Approved' });
  console.log(`[+] Payment Received! State transitioned to PAYMENT_RECEIVED`);

  // 7. Admin confirms points / booking
  await stateMachine.transition(booking.id, BookingStatus.BOOKING_CONFIRMED, admin.id, { reason: 'Admin validated itinerary' });
  console.log(`[+] Admin Confirmed Booking! State transitioned to BOOKING_CONFIRMED`);

  // 8. Roll up Binary Volume!
  const binaryEngine = new BinaryVolumeEngine(prisma);
  console.log(`[+] Initiating Binary Volume Rollup (${booking.binaryVolumeBudget} PV) up the tree...`);
  await binaryEngine.rollUpVolume(booking.id, buyer.member!.id, booking.binaryVolumeBudget);
  
  console.log(`[+] Volume Rollup Complete!`);

  // 9. Let's check the sponsor's new carry forward balance!
  const parentNode = await prisma.binaryNode.findUnique({ where: { id: placement.parentId } });
  console.log(`[+] Parent Node Carry Forward: Left = ${parentNode!.leftCarryForward}, Right = ${parentNode!.rightCarryForward}`);
  console.log('--- E2E TEST SUCCESSFUL! ---');
}

runE2E().catch(console.error).finally(() => prisma.$disconnect());
