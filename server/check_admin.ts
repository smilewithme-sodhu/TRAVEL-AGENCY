import { prisma } from './src/db.js';

async function main() {
  const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
  console.log(admins);
}
main().catch(console.error).finally(() => process.exit(0));
