import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { taskService } from './task.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const taskSchema = z.object({
  competitionId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(6),
  type: z.enum(['SUBMISSION', 'TRACK_EVENT']),
  weight: z.number().int().min(1).max(100),
  meta: z.record(z.any()).optional(),
});

router.use(requireAuth);
router.use(requireRole('SUPER_ADMIN', 'COMPETITION_ADMIN'));

router.post('/', validateBody(taskSchema), async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
});

router.get('/competition/:competitionId', async (req, res) => {
  const tasks = await taskService.listByCompetition(req.params.competitionId);
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await taskService.getTask(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.patch('/:id', validateBody(taskSchema.partial()), async (req, res) => {
  const updated = await taskService.updateTask(req.params.id, req.body);
  res.json(updated);
});

export default router;
