import { prisma } from './src/db.js';

async function main() {
  const member = await prisma.member.findUnique({
    where: { userId: '00000000-0000-0000-0000-000000000000' }
  });
  console.log(member);
}
main().catch(console.error).finally(() => process.exit(0));
