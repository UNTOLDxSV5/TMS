import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { registrationService } from './registration.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const registrationSchema = z.object({
  teamName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  country: z.string().min(2),
  competitionId: z.string().uuid(),
});

const statusSchema = z.object({ notes: z.string().optional() });

router.post('/', validateBody(registrationSchema), async (req, res) => {
  const registration = await registrationService.submitRegistration(req.body);
  res.status(201).json(registration);
});

router.use(requireAuth);
router.use(requireRole('SUPER_ADMIN', 'COMPETITION_ADMIN'));

router.get('/', async (_req, res) => {
  const pending = await registrationService.listPending();
  res.json(pending);
});

router.post('/:id/approve', validateBody(statusSchema), async (req, res) => {
  const registration = await registrationService.approve(req.params.id, req.body.notes);
  res.json(registration);
});

router.post('/:id/reject', validateBody(statusSchema), async (req, res) => {
  const registration = await registrationService.reject(req.params.id, req.body.notes);
  res.json(registration);
});

export default router;
