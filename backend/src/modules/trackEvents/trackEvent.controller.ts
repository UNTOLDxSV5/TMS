import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { trackEventService } from './trackEvent.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const valueSchema = z.object({ taskId: z.string().uuid(), value: z.number() });
const approveSchema = z.object({});

router.use(requireAuth);

router.post('/', validateBody(valueSchema), async (req, res) => {
  const payload = { ...req.body, userId: req.authUser!.id };
  const event = await trackEventService.createValue(payload);
  res.status(201).json(event);
});

router.get('/task/:taskId', async (req, res) => {
  const events = await trackEventService.listByTask(req.params.taskId);
  res.json(events);
});

router.get('/me', async (req, res) => {
  const events = await trackEventService.listByUser(req.authUser!.id);
  res.json(events);
});

router.post('/:id/approve', requireRole('SUPER_ADMIN', 'COMPETITION_ADMIN'), validateBody(approveSchema), async (req, res) => {
  const approved = await trackEventService.approveValue(req.params.id);
  res.json(approved);
});

export default router;
