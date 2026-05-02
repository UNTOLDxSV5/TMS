import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { userService } from './user.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  role: z.enum(['SUPER_ADMIN', 'COMPETITION_ADMIN', 'FINANCE_ADMIN', 'TEAM']),
  competitionId: z.string().uuid().optional().nullable(),
});

const updateUserSchema = z.object({
  role: z.enum(['SUPER_ADMIN', 'COMPETITION_ADMIN', 'FINANCE_ADMIN', 'TEAM']).optional(),
  competitionId: z.string().uuid().optional().nullable(),
});

router.use(requireAuth);
router.use(requireRole('SUPER_ADMIN'));

router.post('/', validateBody(createUserSchema), async (req, res) => {
  const created = await userService.createUser(req.body);
  res.status(201).json({ id: created.id, email: created.email, name: created.name, role: created.role, competitionId: created.competitionId });
});

router.get('/', async (_req, res) => {
  const users = await userService.listUsers();
  res.json(users);
});

router.patch('/:id', validateBody(updateUserSchema), async (req, res) => {
  const updated = await userService.assignRoleAndCompetition(req.params.id, req.body);
  res.json(updated);
});

export default router;
