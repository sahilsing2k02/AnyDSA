import crypto from 'node:crypto';
import { getPool } from '../db.js';
import { ConflictError, ValidationError } from '../errors.js';
import type pg from 'pg';

export interface NoteItem {
  id: string;
  problemId: string;
  content: string;
  version: number;
  updatedAt: string;
}

export class NoteService {
  static async getNotes(userId: string): Promise<Record<string, NoteItem>> {
    const pool = getPool();
    const res = await pool.query(`
      SELECT id, problem_id, content, version, updated_at
      FROM notes
      WHERE user_id = $1
    `, [userId]);

    const result: Record<string, NoteItem> = {};
    for (const r of res.rows) {
      result[r.problem_id] = {
        id: r.id,
        problemId: r.problem_id,
        content: r.content,
        version: r.version,
        updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString()
      };
    }
    return result;
  }

  static async saveNote(
    userId: string,
    problemId: string,
    content: string,
    expectedVersion?: number,
    client?: pg.PoolClient | pg.Pool
  ): Promise<NoteItem> {
    if (!problemId) throw new ValidationError('problemId is required');
    const runner = client || getPool();

    const existingRes = await runner.query(`
      SELECT id, problem_id, content, version, updated_at
      FROM notes
      WHERE user_id = $1 AND problem_id = $2
    `, [userId, problemId]);

    const existing = existingRes.rows[0];

    if (existing) {
      // Optimistic concurrency control check
      if (expectedVersion !== undefined && existing.version !== expectedVersion) {
        throw new ConflictError(
          `Conflict: Note for '${problemId}' was updated elsewhere (current v${existing.version}, expected v${expectedVersion})`,
          {
            id: existing.id,
            problemId: existing.problem_id,
            content: existing.content,
            version: existing.version,
            updatedAt: existing.updated_at
          }
        );
      }

      const nextVersion = existing.version + 1;
      const res = await runner.query(`
        UPDATE notes
        SET content = $1, version = $2, updated_at = NOW()
        WHERE user_id = $3 AND problem_id = $4 AND version = $5
      `, [content, nextVersion, userId, problemId, existing.version]);

      if (res.rowCount === 0) {
        throw new ConflictError('Concurrent edit conflict during update');
      }

      return {
        id: existing.id,
        problemId,
        content,
        version: nextVersion,
        updatedAt: new Date().toISOString()
      };
    } else {
      const id = crypto.randomUUID();
      await runner.query(`
        INSERT INTO notes (id, user_id, problem_id, content, version)
        VALUES ($1, $2, $3, $4, 1)
      `, [id, userId, problemId, content]);

      return {
        id,
        problemId,
        content,
        version: 1,
        updatedAt: new Date().toISOString()
      };
    }
  }
}
