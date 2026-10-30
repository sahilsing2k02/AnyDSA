import crypto from 'node:crypto';
import { getDb } from '../db.js';
import { ConflictError, ValidationError } from '../errors.js';

export interface NoteItem {
  id: string;
  problemId: string;
  content: string;
  version: number;
  updatedAt: string;
}

export class NoteService {
  static getNotes(userId: string): Record<string, NoteItem> {
    const db = getDb();
    const rows = db.prepare(`
      SELECT id, problem_id, content, version, updated_at
      FROM notes
      WHERE user_id = ?
    `).all(userId) as Array<{
      id: string;
      problem_id: string;
      content: string;
      version: number;
      updated_at: string;
    }>;

    const result: Record<string, NoteItem> = {};
    for (const r of rows) {
      result[r.problem_id] = {
        id: r.id,
        problemId: r.problem_id,
        content: r.content,
        version: r.version,
        updatedAt: r.updated_at
      };
    }
    return result;
  }

  static saveNote(userId: string, problemId: string, content: string, expectedVersion?: number): NoteItem {
    if (!problemId) throw new ValidationError('problemId is required');
    const db = getDb();

    const existing = db.prepare(`
      SELECT id, problem_id, content, version, updated_at
      FROM notes
      WHERE user_id = ? AND problem_id = ?
    `).get(userId, problemId) as {
      id: string;
      problem_id: string;
      content: string;
      version: number;
      updated_at: string;
    } | undefined;

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
      const res = db.prepare(`
        UPDATE notes
        SET content = ?, version = ?, updated_at = datetime('now')
        WHERE user_id = ? AND problem_id = ? AND version = ?
      `).run(content, nextVersion, userId, problemId, existing.version);

      if (res.changes === 0) {
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
      db.prepare(`
        INSERT INTO notes (id, user_id, problem_id, content, version)
        VALUES (?, ?, ?, ?, 1)
      `).run(id, userId, problemId, content);

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

