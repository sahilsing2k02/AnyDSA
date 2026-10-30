import crypto from 'node:crypto';
import { getDb } from '../db.js';
import { NoteService } from './noteService.js';
import { ValidationError } from '../errors.js';

export interface UserProgress {
  solvedProblems: string[];
  bookmarkedProblems: string[];
}

export class ProgressService {
  static getProgress(userId: string): UserProgress {
    const db = getDb();
    const rows = db.prepare(`
      SELECT problem_id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = ?
    `).all(userId) as Array<{
      problem_id: string;
      is_solved: number;
      is_bookmarked: number;
    }>;

    const solvedProblems: string[] = [];
    const bookmarkedProblems: string[] = [];

    for (const r of rows) {
      if (r.is_solved === 1) solvedProblems.push(r.problem_id);
      if (r.is_bookmarked === 1) bookmarkedProblems.push(r.problem_id);
    }

    return { solvedProblems, bookmarkedProblems };
  }

  static toggleSolved(userId: string, problemId: string): boolean {
    if (!problemId) throw new ValidationError('problemId is required');
    const db = getDb();

    const existing = db.prepare(`
      SELECT id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = ? AND problem_id = ?
    `).get(userId, problemId) as { id: string; is_solved: number; is_bookmarked: number } | undefined;

    if (existing) {
      const nextState = existing.is_solved === 1 ? 0 : 1;
      db.prepare(`
        UPDATE progress
        SET is_solved = ?, updated_at = datetime('now')
        WHERE user_id = ? AND problem_id = ?
      `).run(nextState, userId, problemId);
      return nextState === 1;
    } else {
      const id = crypto.randomUUID();
      db.prepare(`
        INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
        VALUES (?, ?, ?, 1, 0)
      `).run(id, userId, problemId);
      return true;
    }
  }

  static toggleBookmark(userId: string, problemId: string): boolean {
    if (!problemId) throw new ValidationError('problemId is required');
    const db = getDb();

    const existing = db.prepare(`
      SELECT id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = ? AND problem_id = ?
    `).get(userId, problemId) as { id: string; is_solved: number; is_bookmarked: number } | undefined;

    if (existing) {
      const nextState = existing.is_bookmarked === 1 ? 0 : 1;
      db.prepare(`
        UPDATE progress
        SET is_bookmarked = ?, updated_at = datetime('now')
        WHERE user_id = ? AND problem_id = ?
      `).run(nextState, userId, problemId);
      return nextState === 1;
    } else {
      const id = crypto.randomUUID();
      db.prepare(`
        INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
        VALUES (?, ?, ?, 0, 1)
      `).run(id, userId, problemId);
      return true;
    }
  }

  /**
   * Atomic transaction updating progress state and note content together
   */
  static atomicSync(
    userId: string,
    payload: {
      problemId: string;
      isSolved?: boolean;
      isBookmarked?: boolean;
      noteContent?: string;
      noteVersion?: number;
    }
  ): { success: boolean; note?: any } {
    const { problemId, isSolved, isBookmarked, noteContent, noteVersion } = payload;
    if (!problemId) throw new ValidationError('problemId is required');

    const db = getDb();

    // Begin atomic transaction
    db.exec('BEGIN TRANSACTION;');
    try {
      if (isSolved !== undefined || isBookmarked !== undefined) {
        const existing = db.prepare(`
          SELECT id, is_solved, is_bookmarked
          FROM progress
          WHERE user_id = ? AND problem_id = ?
        `).get(userId, problemId) as { id: string; is_solved: number; is_bookmarked: number } | undefined;

        const nextSolved = isSolved !== undefined ? (isSolved ? 1 : 0) : (existing?.is_solved ?? 0);
        const nextBookmarked = isBookmarked !== undefined ? (isBookmarked ? 1 : 0) : (existing?.is_bookmarked ?? 0);

        if (existing) {
          db.prepare(`
            UPDATE progress
            SET is_solved = ?, is_bookmarked = ?, updated_at = datetime('now')
            WHERE user_id = ? AND problem_id = ?
          `).run(nextSolved, nextBookmarked, userId, problemId);
        } else {
          const id = crypto.randomUUID();
          db.prepare(`
            INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
            VALUES (?, ?, ?, ?, ?)
          `).run(id, userId, problemId, nextSolved, nextBookmarked);
        }
      }

      let updatedNote;
      if (noteContent !== undefined) {
        updatedNote = NoteService.saveNote(userId, problemId, noteContent, noteVersion);
      }

      db.exec('COMMIT;');
      return { success: true, note: updatedNote };
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }

  static resetProgress(userId: string): void {
    const db = getDb();
    db.exec('BEGIN TRANSACTION;');
    try {
      db.prepare('DELETE FROM progress WHERE user_id = ?').run(userId);
      db.prepare('DELETE FROM notes WHERE user_id = ?').run(userId);
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }
}

