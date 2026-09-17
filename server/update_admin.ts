import { prisma } from './src/db.js';
import bcrypt from 'bcryptjs';

async function main() {
  const hash = await bcrypt.hash('admin', 10);
  await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-000000000000' },
    update: { name: 'admin', passwordHash: hash },
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'admin',
      email: 'admin@wanderlust.com',
      phone: '+10000000000',
      passwordHash: hash,
      role: 'ADMIN'
    }
  });
  console.log('Admin password updated to "admin", name to "admin"');
}
main().catch(console.error).finally(() => process.exit(0));
