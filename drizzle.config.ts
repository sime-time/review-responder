import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/server/drizzle/schema",
  out: "./src/lib/server/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
