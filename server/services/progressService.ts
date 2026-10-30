import crypto from 'node:crypto';
import { getPool } from '../db.js';
import { NoteService } from './noteService.js';
import { ValidationError } from '../errors.js';

export interface UserProgress {
  solvedProblems: string[];
  bookmarkedProblems: string[];
}

export class ProgressService {
  static async getProgress(userId: string): Promise<UserProgress> {
    const pool = getPool();
    const res = await pool.query(`
      SELECT problem_id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = $1
    `, [userId]);

    const solvedProblems: string[] = [];
    const bookmarkedProblems: string[] = [];

    for (const r of res.rows) {
      if (Number(r.is_solved) === 1) solvedProblems.push(r.problem_id);
      if (Number(r.is_bookmarked) === 1) bookmarkedProblems.push(r.problem_id);
    }

    return { solvedProblems, bookmarkedProblems };
  }

  static async toggleSolved(userId: string, problemId: string): Promise<boolean> {
    if (!problemId) throw new ValidationError('problemId is required');
    const pool = getPool();

    const existingRes = await pool.query(`
      SELECT id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = $1 AND problem_id = $2
    `, [userId, problemId]);

    const existing = existingRes.rows[0];

    if (existing) {
      const nextState = Number(existing.is_solved) === 1 ? 0 : 1;
      await pool.query(`
        UPDATE progress
        SET is_solved = $1, updated_at = NOW()
        WHERE user_id = $2 AND problem_id = $3
      `, [nextState, userId, problemId]);
      return nextState === 1;
    } else {
      const id = crypto.randomUUID();
      await pool.query(`
        INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
        VALUES ($1, $2, $3, 1, 0)
      `, [id, userId, problemId]);
      return true;
    }
  }

  static async toggleBookmark(userId: string, problemId: string): Promise<boolean> {
    if (!problemId) throw new ValidationError('problemId is required');
    const pool = getPool();

    const existingRes = await pool.query(`
      SELECT id, is_solved, is_bookmarked
      FROM progress
      WHERE user_id = $1 AND problem_id = $2
    `, [userId, problemId]);

    const existing = existingRes.rows[0];

    if (existing) {
      const nextState = Number(existing.is_bookmarked) === 1 ? 0 : 1;
      await pool.query(`
        UPDATE progress
        SET is_bookmarked = $1, updated_at = NOW()
        WHERE user_id = $2 AND problem_id = $3
      `, [nextState, userId, problemId]);
      return nextState === 1;
    } else {
      const id = crypto.randomUUID();
      await pool.query(`
        INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
        VALUES ($1, $2, $3, 0, 1)
      `, [id, userId, problemId]);
      return true;
    }
  }

  /**
   * Atomic PostgreSQL transaction updating progress state and note content together
   */
  static async atomicSync(
    userId: string,
    payload: {
      problemId: string;
      isSolved?: boolean;
      isBookmarked?: boolean;
      noteContent?: string;
      noteVersion?: number;
    }
  ): Promise<{ success: boolean; note?: any }> {
    const { problemId, isSolved, isBookmarked, noteContent, noteVersion } = payload;
    if (!problemId) throw new ValidationError('problemId is required');

    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      if (isSolved !== undefined || isBookmarked !== undefined) {
        const existingRes = await client.query(`
          SELECT id, is_solved, is_bookmarked
          FROM progress
          WHERE user_id = $1 AND problem_id = $2
        `, [userId, problemId]);

        const existing = existingRes.rows[0];
        const nextSolved = isSolved !== undefined ? (isSolved ? 1 : 0) : (existing ? Number(existing.is_solved) : 0);
        const nextBookmarked = isBookmarked !== undefined ? (isBookmarked ? 1 : 0) : (existing ? Number(existing.is_bookmarked) : 0);

        if (existing) {
          await client.query(`
            UPDATE progress
            SET is_solved = $1, is_bookmarked = $2, updated_at = NOW()
            WHERE user_id = $3 AND problem_id = $4
          `, [nextSolved, nextBookmarked, userId, problemId]);
        } else {
          const id = crypto.randomUUID();
          await client.query(`
            INSERT INTO progress (id, user_id, problem_id, is_solved, is_bookmarked)
            VALUES ($1, $2, $3, $4, $5)
          `, [id, userId, problemId, nextSolved, nextBookmarked]);
        }
      }

      let updatedNote;
      if (noteContent !== undefined) {
        updatedNote = await NoteService.saveNote(userId, problemId, noteContent, noteVersion, client);
      }

      await client.query('COMMIT');
      return { success: true, note: updatedNote };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async resetProgress(userId: string): Promise<void> {
    const pool = getPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM progress WHERE user_id = $1', [userId]);
      await client.query('DELETE FROM notes WHERE user_id = $1', [userId]);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}
