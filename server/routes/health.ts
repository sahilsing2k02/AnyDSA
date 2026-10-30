import { Router } from 'express';
import { getPool } from '../db.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT 1 as alive;');
    if (result.rows[0]?.alive === 1 || result.rows[0]?.alive === '1') {
      res.json({
        status: 'ok',
        database: 'postgresql_connected',
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
