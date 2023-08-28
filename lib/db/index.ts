import { db as vercelDb } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema";

const client = await vercelDb.connect();

export const db = drizzle(client, { schema });
