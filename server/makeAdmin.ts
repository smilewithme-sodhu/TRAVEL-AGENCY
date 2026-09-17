import { config } from 'dotenv';
config({ path: '../.env' });
import { prisma } from './src/db';

async function listUsers() {
  try {
    const users = await prisma.user.findMany({ select: { email: true, role: true } });
    
    if (users.length > 0) {
      for (const u of users) {
         if (u.role !== 'ADMIN') {
           await prisma.user.update({
             where: { email: u.email },
             data: { role: 'ADMIN' }
           });
           console.log(`Successfully upgraded ${u.email} to ADMIN!`);
         } else {
           console.log(`${u.email} is already an ADMIN.`);
         }
      }
    } else {
      console.log('No users found in the database. Please register an account first via the frontend.');
    }
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
