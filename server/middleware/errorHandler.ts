import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors.js';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Centralized internal error logging
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [ERROR] ${err?.name || 'Error'}: ${err?.message}`);
  if (err?.stack && process.env.NODE_ENV !== 'test') {
    console.error(err.stack);
  }

  // Consistent, sanitized response payload
  if (err instanceof HttpError) {
    const payload: { error: string; code?: string; currentData?: any } = {
      error: err.message
    };
    if ('currentData' in err && err.currentData) {
      payload.currentData = err.currentData;
    }
    res.status(err.statusCode).json(payload);
    return;
  }

  // Unknown / unhandled error -> sanitize
  res.status(500).json({
    error: 'Internal server error'
  });
}

