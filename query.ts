import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const members = await prisma.member.findMany();
  console.log('Members:', members.length);
  const withdrawals = await prisma.withdrawal.findMany();
  console.log('Withdrawals:', withdrawals.map(w => ({ id: w.id, amount: w.requestedAmount, status: w.status })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
