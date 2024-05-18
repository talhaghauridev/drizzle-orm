import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../drizzle/schema";
import { DATABASE_URL } from "../constants";
import postgres from "postgres";

const client = postgres(DATABASE_URL, {
  max: 1,
});

export const db = drizzle(client, { schema, logger: true });
