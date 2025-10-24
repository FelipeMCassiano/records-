import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// const db = drizzle(process.env.DATABASE_URL!, schema: {});
console.log("url: ", process.env.DATABASE_URL);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL! as string,
});
export const db = drizzle(pool, { schema });
