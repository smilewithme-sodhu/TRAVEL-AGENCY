import { injectWhatsAppBooking } from './src/controllers/admin.controller';
import { prisma } from './src/db';

async function testInjection() {
  console.log('--- STARTING WHATSAPP BOOKING INJECTION TEST ---');
  
  const member = await prisma.member.findFirst();
  if (!member) {
    console.log('No members found. Cannot test.');
    return;
  }
  console.log('Testing with Member:', member.id);

  const req = {
    body: {
      memberId: member.id,
      amountPaid: 15000,
      binaryPoints: 50,
      teamBonusPoints: 10,
      directBonusPoints: 500
    }
  } as any;

  let statusCode = 200;
  let responseData: any = null;

  const res = {
    status: (code: number) => { statusCode = code; return res; },
    json: (data: any) => { responseData = data; return res; }
  } as any;

  console.log('Calling injectWhatsAppBooking...');
  await injectWhatsAppBooking(req, res);

  console.log('Response Status:', statusCode);
  console.log('Response Data:', responseData);

  if (statusCode === 200 && responseData.success) {
    console.log('\n--- VERIFYING DATABASE CHANGES ---');
    const booking = await prisma.booking.findUnique({ where: { id: responseData.bookingId } });
    console.log('✅ Booking Created:', booking ? booking.bookingRef : 'Not Found');

    const walletTx = await prisma.walletTransaction.findMany({
      where: { notes: { contains: responseData.bookingRef } }
    });
    console.log('✅ Wallet Transactions for Booking:', walletTx.length);
    walletTx.forEach(tx => console.log(`  -> ${tx.transactionType}: ${tx.amount} (Wallet: ${tx.walletId})`));

    const binaryVol = await prisma.binaryVolumeEvent.findMany({
      where: { sourceBookingId: responseData.bookingId }
    });
    console.log('✅ Binary Volume Events:', binaryVol.length);
    if (binaryVol.length > 0) {
      console.log(`  -> Rolled up ${binaryVol[0].amount} volume`);
    }

    const teamBonusRewards = await prisma.reward.findMany({
      where: { sourceBookingId: responseData.bookingId, rewardType: 'TEAM_BONUS' }
    });
    console.log('✅ Team Bonus Rewards Created:', teamBonusRewards.length);
  }
  
  process.exit(0);
}

testInjection().catch(console.error);
