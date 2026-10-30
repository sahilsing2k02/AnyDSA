import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { UnauthorizedError } from '../errors.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  sessionId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Prevent any caching of authenticated responses to prevent back-button replay
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const sessionId = req.cookies?.session_id || (req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].slice(7) : undefined);

  if (!sessionId) {
    return next(new UnauthorizedError('Authentication session required'));
  }

  try {
    const user = await AuthService.validateSession(sessionId);
    if (!user) {
      res.clearCookie('session_id', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      });
      return next(new UnauthorizedError('Invalid or expired session'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
