import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import fs from 'node:fs';
import { runMigrations } from './migrations.js';
import { authRouter } from './routes/auth.js';
import { notesRouter } from './routes/notes.js';
import { progressRouter } from './routes/progress.js';
import { healthRouter } from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

export async function createApp() {
  // Ensure schema migrations are executed
  await runMigrations();

  const app = express();

  // Basic security and parsing middleware
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(cookieParser());

  // CORS middleware for separate Vercel frontend / Render backend deployments
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
      : ['http://localhost:5173'];

    if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  // API Routes
  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/notes', notesRouter);
  app.use('/api/progress', progressRouter);

  // Serve production client build when dist exists (Render full-stack web service mode)
  const distPath = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.join(distPath, 'index.html'));
      }
      next();
    });
  }

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
}
