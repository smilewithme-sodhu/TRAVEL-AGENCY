const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = 'admin@wanderlust.com';
  const password = 'AdminPassword123!';
  
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({ where: { id: existing.id }, data: { role: 'ADMIN' } });
      console.log('Updated existing user to ADMIN role:', email);
    } else {
      console.log('Admin already exists:', email);
    }
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email,
        phone: '+10000000000',
        passwordHash,
        role: 'ADMIN',
      }
    });
    console.log('Created new Admin account:', email);
  }
}

seedAdmin().catch(console.error).finally(() => prisma.$disconnect());
