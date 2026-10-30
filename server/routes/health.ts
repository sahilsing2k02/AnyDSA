import { Router } from 'express';
import { getDb } from '../db.js';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  try {
    const db = getDb();
    // Test database query
    const row = db.prepare('SELECT 1 as alive').get() as { alive: number } | undefined;
    if (row?.alive === 1) {
      res.json({
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'error',
        database: 'unexpected_response',
        timestamp: new Date().toISOString()
      });
    }
  } catch (err: any) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: err?.message || 'Database error',
      timestamp: new Date().toISOString()
    });
  }
});

