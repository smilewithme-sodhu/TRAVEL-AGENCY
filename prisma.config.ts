import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// ---------------------------------------------------------------------------
// Prisma 7 Configuration
// The DATABASE_URL env var is read here, not in schema.prisma.
// For local dev, set DATABASE_URL in a .env file (never committed to git).
// ---------------------------------------------------------------------------

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/travel_agency_test",
  },
  migrate: {
    async adapter() {
      const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error(
          "DIRECT_URL environment variable is not set. " +
            "Please configure your Supabase connection strings in .env"
        );
      }
      const pool = new pg.Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
});
