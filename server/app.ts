import express from 'express';
import cookieParser from 'cookie-parser';
import { runMigrations } from './migrations.js';
import { authRouter } from './routes/auth.js';
import { notesRouter } from './routes/notes.js';
import { progressRouter } from './routes/progress.js';
import { healthRouter } from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  // Ensure schema migrations are executed
  runMigrations();

  const app = express();

  // Basic security and parsing middleware
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/notes', notesRouter);
  app.use('/api/progress', progressRouter);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
}

