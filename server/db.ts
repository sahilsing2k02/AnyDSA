import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export const DB_PATH = process.env.NODE_ENV === 'test' 
  ? ':memory:' 
  : path.join(DB_DIR, 'anydsa.sqlite');

let databaseInstance: DatabaseSync | null = null;

export function getDb(retries = 3, delayMs = 200): DatabaseSync {
  if (databaseInstance) return databaseInstance;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const db = new DatabaseSync(DB_PATH);
      // Enforce relational integrity & write performance
      db.exec('PRAGMA foreign_keys = ON;');
      db.exec('PRAGMA journal_mode = WAL;');
      databaseInstance = db;
      return databaseInstance;
    } catch (err) {
      if (attempt === retries) {
        console.error(`[DB] Failed to connect after ${retries} attempts:`, err);
        throw err;
      }
      const wait = delayMs * attempt;
      const start = Date.now();
      while (Date.now() - start < wait) {
        // synchronous backoff pause for SQLite lock contention
      }
    }
  }
  throw new Error('Database initialization failure');
}

export function closeDb(): void {
  if (databaseInstance) {
    try {
      databaseInstance.close();
    } catch {
      // ignore on close
    }
    databaseInstance = null;
  }
}

