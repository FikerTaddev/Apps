import { Pool } from "pg";
import { env } from "./env.js";

export const db = new Pool({
  connectionString: env.DB_HOST,
  max: 10,
  idleTimeoutMillis: 30000,
});
