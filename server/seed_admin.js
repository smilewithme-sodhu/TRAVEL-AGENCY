const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

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
    console.log('Found ADMIN:', admin);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
