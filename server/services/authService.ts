import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';
import { ValidationError, UnauthorizedError, ConflictError } from '../errors.js';

// Strict RFC-compliant email regex
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(email: string): string {
  if (typeof email !== 'string') throw new ValidationError('Email must be a string');
  const normalized = email.trim().toLowerCase();
  if (normalized.length === 0 || normalized.length > 254) {
    throw new ValidationError('Email length must be between 1 and 254 characters');
  }
  const [local, domain] = normalized.split('@');
  if (!local || !domain || local.length > 64) {
    throw new ValidationError('Invalid email format');
  }
  if (!RFC_EMAIL_REGEX.test(normalized)) {
    throw new ValidationError('Invalid RFC-compliant email address');
  }
  return normalized;
}

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

export interface SessionRow {
  id: string;
  user_id: string;
  expires_at: number;
  created_at: string;
}

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export class AuthService {
  static async register(emailRaw: string, password: string, nameRaw?: string): Promise<{ user: { id: string; email: string; name: string }; sessionId: string; expiresAt: number }> {
    const email = validateEmail(emailRaw);
    if (!password || password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters long');
    }
    const name = nameRaw?.trim() || email.split('@')[0];

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      throw new ConflictError('A user with this email already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userId = crypto.randomUUID();

    db.prepare(`
      INSERT INTO users (id, email, password_hash, name)
      VALUES (?, ?, ?, ?)
    `).run(userId, email, passwordHash, name);

    const { sessionId, expiresAt } = this.createSession(userId);

    return {
      user: { id: userId, email, name },
      sessionId,
      expiresAt
    };
  }

  static async login(emailRaw: string, password: string): Promise<{ user: { id: string; email: string; name: string }; sessionId: string; expiresAt: number }> {
    const email = validateEmail(emailRaw);
    if (!password) {
      throw new ValidationError('Password is required');
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const { sessionId, expiresAt } = this.createSession(user.id);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      sessionId,
      expiresAt
    };
  }

  static createSession(userId: string): { sessionId: string; expiresAt: number } {
    const db = getDb();
    const sessionId = crypto.randomUUID();
    const expiresAt = Date.now() + SESSION_TTL_MS;

    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at)
      VALUES (?, ?, ?)
    `).run(sessionId, userId, expiresAt);

    return { sessionId, expiresAt };
  }

  static validateSession(sessionId: string): { id: string; email: string; name: string; sessionId: string } | null {
    if (!sessionId) return null;
    const db = getDb();

    // Query session joined with user
    const row = db.prepare(`
      SELECT s.id as sessionId, s.expires_at, u.id as userId, u.email, u.name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ?
    `).get(sessionId) as { sessionId: string; expires_at: number; userId: string; email: string; name: string } | undefined;

    if (!row) return null;

    if (Date.now() > row.expires_at) {
      // Invalidate expired session
      db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
      return null;
    }

    return {
      id: row.userId,
      email: row.email,
      name: row.name,
      sessionId: row.sessionId
    };
  }

  static logout(sessionId: string): void {
    if (!sessionId) return;
    const db = getDb();
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
  }
}

