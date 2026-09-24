import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    const members = await prisma.member.findMany({
      include: { user: true, wallet: true, _count: { select: { referralsGiven: true } } }
    });
    const mapped = members.map(m => ({
      id: m.id,
      name: m.user?.name || 'Unknown',
      code: m.memberId || m.referralCode,
      status: m.greenStatus,
      directSales: m._count?.referralsGiven || 0,
      balance: 0,
      joined: m.joinedAt ? m.joinedAt.toISOString().split('T')[0] : 'Unknown'
    }));
    console.log(mapped);
  } catch (err) {
    console.error("QUERY CRASHED:", err);
  }
}
main().finally(() => prisma.$disconnect());
