import { prisma } from './src/db.js';

async function main() {
  const identifier = 'admin';
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
          { member: { is: { memberId: identifier } } },
          { name: identifier }
        ]
      },
      include: { member: true }
    });
    console.log(user);
  } catch (err) {
    console.error('ERROR:', err);
  }
}
main().catch(console.error).finally(() => process.exit(0));
