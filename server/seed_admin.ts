import { prisma } from './src/db.js';
import bcrypt from 'bcryptjs';

async function main() {
  let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  
  if (!admin) {
    console.log('No ADMIN found. Creating admin@wanderlust.com / Admin@123');
    const hash = await bcrypt.hash('Admin@123', 10);
    admin = await prisma.user.create({
      data: {
        name: 'System Admin',
        email: 'admin@wanderlust.com',
        phone: '1234567890',
        passwordHash: hash,
        role: 'ADMIN'
      }
    });
    console.log('Created Admin:', admin);
  } else {
    console.log('Found ADMIN:', admin.email);
    // Maybe update the password just in case?
    const hash = await bcrypt.hash('Admin@123', 10);
    await prisma.user.update({
      where: { id: admin.id },
      data: { passwordHash: hash }
    });
    console.log('Updated password for admin to Admin@123');
  }
}

main().catch(console.error).finally(() => process.exit(0));
