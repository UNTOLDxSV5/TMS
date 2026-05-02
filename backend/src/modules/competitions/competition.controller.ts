import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { competitionService } from './competition.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const competitionSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  deadline: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid deadline date'),
  status: z.enum(['DRAFT', 'ACTIVE']).default('DRAFT'),
});

router.use(requireAuth);
router.use(requireRole('SUPER_ADMIN', 'COMPETITION_ADMIN'));

router.post('/', validateBody(competitionSchema), async (req, res) => {
  const { name, description, deadline, status } = req.body;
  const competition = await competitionService.createCompetition({ name, description, deadline: new Date(deadline), status });
  res.status(201).json(competition);
});

router.get('/', async (_req, res) => {
  const competitions = await competitionService.listCompetitions();
  res.json(competitions);
});

router.get('/:id', async (req, res) => {
  const competition = await competitionService.getCompetition(req.params.id);
  if (!competition) return res.status(404).json({ message: 'Competition not found' });
  res.json(competition);
});

router.patch('/:id', validateBody(competitionSchema.partial()), async (req, res) => {
  const payload = req.body;
  if (payload.deadline) payload.deadline = new Date(payload.deadline);
  const updated = await competitionService.updateCompetition(req.params.id, payload);
  res.json(updated);
});

export default router;
