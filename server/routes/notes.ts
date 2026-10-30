import { Router } from 'express';
import { z } from 'zod';
import { NoteService } from '../services/noteService.js';
import { requireAuth } from '../middleware/auth.js';
import { ValidationError } from '../errors.js';

export const notesRouter = Router();

notesRouter.use(requireAuth);

const saveNoteSchema = z.object({
  content: z.string(),
  version: z.number().int().positive().optional()
});

notesRouter.get('/', (req, res) => {
  const notes = NoteService.getNotes(req.user!.id);
  res.json({ notes });
});

notesRouter.put('/:problemId', (req, res, next) => {
  try {
    const { problemId } = req.params;
    const parse = saveNoteSchema.safeParse(req.body);
    if (!parse.success) {
      throw new ValidationError(parse.error.issues.map(i => i.message).join(', '));
    }

    const note = NoteService.saveNote(
      req.user!.id,
      problemId,
      parse.data.content,
      parse.data.version
    );

    res.json({ note });
  } catch (err) {
    next(err);
  }
});

