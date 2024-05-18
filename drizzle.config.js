import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/constants";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema/index.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
  verbose:true,
  strict:true
})
