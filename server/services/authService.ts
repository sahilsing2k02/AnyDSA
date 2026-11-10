import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { getPool } from '../db.js';
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
  password_hash: string | null;
  name: string;
  google_id: string | null;
  auth_provider: string;
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

    const pool = getPool();
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new ConflictError('A user with this email already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userId = crypto.randomUUID();

    await pool.query(
      'INSERT INTO users (id, email, password_hash, name) VALUES ($1, $2, $3, $4)',
      [userId, email, passwordHash, name]
    );

    const { sessionId, expiresAt } = await this.createSession(userId);

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

    const pool = getPool();
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = res.rows[0] as UserRow | undefined;
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.password_hash) {
      throw new UnauthorizedError('This account was created using Google. Please sign in with Google.');
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const { sessionId, expiresAt } = await this.createSession(user.id);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      sessionId,
      expiresAt
    };
  }

  static async loginOrRegisterWithGoogle(profile: {
    googleId: string;
    email: string;
    name?: string;
  }): Promise<{ user: { id: string; email: string; name: string }; sessionId: string; expiresAt: number }> {
    const email = validateEmail(profile.email);
    const name = profile.name?.trim() || email.split('@')[0];
    const pool = getPool();

    // 1. Check if user already exists with this Google ID
    let res = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.googleId]);
    let user = res.rows[0] as UserRow | undefined;

    if (user) {
      const { sessionId, expiresAt } = await this.createSession(user.id);
      return { user: { id: user.id, email: user.email, name: user.name }, sessionId, expiresAt };
    }

    // 2. Check if user already exists with the same email (account linking)
    res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    user = res.rows[0] as UserRow | undefined;

    if (user) {
      await pool.query('UPDATE users SET google_id = $1 WHERE id = $2', [profile.googleId, user.id]);
      const { sessionId, expiresAt } = await this.createSession(user.id);
      return { user: { id: user.id, email: user.email, name: user.name }, sessionId, expiresAt };
    }

    // 3. New user registration via Google
    const userId = crypto.randomUUID();
    await pool.query(
      'INSERT INTO users (id, email, password_hash, name, google_id, auth_provider) VALUES ($1, $2, NULL, $3, $4, $5)',
      [userId, email, name, profile.googleId, 'google']
    );

    const { sessionId, expiresAt } = await this.createSession(userId);
    return {
      user: { id: userId, email, name },
      sessionId,
      expiresAt
    };
  }

  static async createSession(userId: string): Promise<{ sessionId: string; expiresAt: number }> {
    const pool = getPool();
    const sessionId = crypto.randomUUID();
    const expiresAt = Date.now() + SESSION_TTL_MS;

    await pool.query(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)',
      [sessionId, userId, expiresAt]
    );

    return { sessionId, expiresAt };
  }

  static async validateSession(sessionId: string): Promise<{ id: string; email: string; name: string; sessionId: string } | null> {
    if (!sessionId) return null;
    const pool = getPool();

    const res = await pool.query(`
      SELECT s.id as "sessionId", s.expires_at, u.id as "userId", u.email, u.name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = $1
    `, [sessionId]);

    const row = res.rows[0] as { sessionId: string; expires_at: string | number; userId: string; email: string; name: string } | undefined;
    if (!row) return null;

    const expiresAt = Number(row.expires_at);
    if (Date.now() > expiresAt) {
      await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
      return null;
    }

    return {
      id: row.userId,
      email: row.email,
      name: row.name,
      sessionId: row.sessionId
    };
  }

  static async logout(sessionId: string): Promise<void> {
    if (!sessionId) return;
    const pool = getPool();
    await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
  }
}
