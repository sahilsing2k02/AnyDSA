import pg from 'pg';
import { newDb } from 'pg-mem';

const { Pool } = pg;

export type DbPool = pg.Pool;

let poolInstance: DbPool | null = null;

export function getPool(): DbPool {
  if (poolInstance) return poolInstance;

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl && process.env.NODE_ENV !== 'test') {
    // Production / External PostgreSQL connection
    console.log('[Database] Connecting to PostgreSQL via DATABASE_URL...');
    poolInstance = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } else {
    // High-fidelity in-memory PostgreSQL engine for local development & testing
    console.log('[Database] Using in-memory PostgreSQL engine...');
    const memDb = newDb();
    const memPg = memDb.adapters.createPg();
    poolInstance = new memPg.Pool() as unknown as DbPool;
  }

  return poolInstance;
}

export async function closePool(): Promise<void> {
  if (poolInstance) {
    try {
      await poolInstance.end();
    } catch {
      // ignore on close
    }
    poolInstance = null;
  }
}
