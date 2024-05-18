import { configDotenv } from "dotenv";

configDotenv({
  path: "./.env",
});

const DATABASE_URL = process.env.DATABASE_URL!;
const NODE_ENV = process.env.NODE_ENV!;

const PORT = Number(process.env.PORT || 4000);

export { DATABASE_URL, PORT, NODE_ENV };
