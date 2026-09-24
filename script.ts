import { PrismaClient } from './server/node_modules/@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const members = await prisma.member.findMany();
  console.log('Members count:', members.length);
  if (members.length > 0) console.log(members[0].memberId);
}
main().catch(console.error).finally(() => prisma.$disconnect());
