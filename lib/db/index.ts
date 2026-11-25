import { Pool } from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  cwsPool?: Pool;
  cwsDb?: NodePgDatabase<typeof schema>;
};

export function getDb(): NodePgDatabase<typeof schema> | null {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) return null;

  if (!globalForDb.cwsDb) {
    globalForDb.cwsPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
    });
    globalForDb.cwsDb = drizzle(globalForDb.cwsPool, { schema });
  }

  return globalForDb.cwsDb;
}
