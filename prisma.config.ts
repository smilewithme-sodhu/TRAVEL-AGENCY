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
  migrate: {
    datasource: {
      url: "postgresql://postgres:postgres@localhost:5432/travel_agency_test",
    },
    async adapter() {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error(
          "DATABASE_URL environment variable is not set. " +
            "Create a .env file at the project root with: DATABASE_URL=postgresql://user:pass@localhost:5432/project1"
        );
      }
      const pool = new pg.Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
});
