const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || "postgresql://postgres.gcpzrkurjcxwvebukugi:A6BNs0qG4eKjUaGu@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TYPE "MemberGreenStatus" ADD VALUE IF NOT EXISTS 'ORANGE';`);
    console.log('Successfully added ORANGE to enum in database!');
  } catch (e) {
    console.error('Error:', e.message);
  }
}
main().catch(console.error).finally(() => process.exit(0));
