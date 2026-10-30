import { Router } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/authService.js';
import { requireAuth } from '../middleware/auth.js';
import { ValidationError } from '../errors.js';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().trim().optional()
});

const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(1, 'Password is required')
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/'
};

authRouter.post('/register', async (req, res, next) => {
  try {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
      throw new ValidationError(parse.error.issues.map(i => i.message).join(', '));
    }

    const { email, password, name } = parse.data;
    const result = await AuthService.register(email, password, name);

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.status(201).json({
      user: result.user
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      throw new ValidationError(parse.error.issues.map(i => i.message).join(', '));
    }

    const { email, password } = parse.data;
    const result = await AuthService.login(email, password);

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.json({
      user: result.user
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', (req, res) => {
  const sessionId = req.cookies?.session_id || (req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].slice(7) : undefined);
  if (sessionId) {
    AuthService.logout(sessionId);
  }

  // Clear cookie and set strict cache prevention headers
  res.clearCookie('session_id', COOKIE_OPTIONS);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({
    user: req.user
  });
});

