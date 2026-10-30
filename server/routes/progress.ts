import { Router } from 'express';
import { z } from 'zod';
import { ProgressService } from '../services/progressService.js';
import { requireAuth } from '../middleware/auth.js';
import { ValidationError } from '../errors.js';

export const progressRouter = Router();

progressRouter.use(requireAuth);

const problemIdSchema = z.object({
  problemId: z.string().min(1, 'problemId is required')
});

const atomicSyncSchema = z.object({
  problemId: z.string().min(1, 'problemId is required'),
  isSolved: z.boolean().optional(),
  isBookmarked: z.boolean().optional(),
  noteContent: z.string().optional(),
  noteVersion: z.number().int().positive().optional()
});

progressRouter.get('/', (req, res) => {
  const progress = ProgressService.getProgress(req.user!.id);
  res.json(progress);
});

progressRouter.post('/toggle-solved', (req, res, next) => {
  try {
    const parse = problemIdSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const isSolved = ProgressService.toggleSolved(req.user!.id, parse.data.problemId);
    res.json({ problemId: parse.data.problemId, isSolved });
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/toggle-bookmark', (req, res, next) => {
  try {
    const parse = problemIdSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const isBookmarked = ProgressService.toggleBookmark(req.user!.id, parse.data.problemId);
    res.json({ problemId: parse.data.problemId, isBookmarked });
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/atomic-sync', (req, res, next) => {
  try {
    const parse = atomicSyncSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const result = ProgressService.atomicSync(req.user!.id, parse.data);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/reset', (req, res) => {
  ProgressService.resetProgress(req.user!.id);
  res.json({ success: true, message: 'All user progress and notes cleared' });
});

