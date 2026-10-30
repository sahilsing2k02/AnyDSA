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

progressRouter.get('/', async (req, res, next) => {
  try {
    const progress = await ProgressService.getProgress(req.user!.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/toggle-solved', async (req, res, next) => {
  try {
    const parse = problemIdSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const isSolved = await ProgressService.toggleSolved(req.user!.id, parse.data.problemId);
    res.json({ problemId: parse.data.problemId, isSolved });
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/toggle-bookmark', async (req, res, next) => {
  try {
    const parse = problemIdSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const isBookmarked = await ProgressService.toggleBookmark(req.user!.id, parse.data.problemId);
    res.json({ problemId: parse.data.problemId, isBookmarked });
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/atomic-sync', async (req, res, next) => {
  try {
    const parse = atomicSyncSchema.safeParse(req.body);
    if (!parse.success) throw new ValidationError(parse.error.issues[0].message);

    const result = await ProgressService.atomicSync(req.user!.id, parse.data);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

progressRouter.post('/reset', async (req, res, next) => {
  try {
    await ProgressService.resetProgress(req.user!.id);
    res.json({ success: true, message: 'All user progress and notes cleared' });
  } catch (err) {
    next(err);
  }
});
