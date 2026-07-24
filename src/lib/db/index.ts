import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../../../drizzle/schema"

const connectionString = process.env.DATABASE_URL!

// For query purposes
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })

// For migrations (singleton)
export function getDb() {
  return db
}
