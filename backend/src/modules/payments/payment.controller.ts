import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { paymentService } from './payment.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();

const paymentSchema = z.object({ userId: z.string().uuid(), amount: z.number().min(0), paid: z.boolean() });

router.use(requireAuth);

router.get('/me', async (req, res) => {
  const payments = await paymentService.listByUser(req.authUser!.id);
  res.json(payments);
});

router.get('/', requireRole('SUPER_ADMIN', 'FINANCE_ADMIN'), async (_req, res) => {
  const payments = await paymentService.listAll();
  res.json(payments);
});

router.post('/', requireRole('SUPER_ADMIN', 'FINANCE_ADMIN'), validateBody(paymentSchema), async (req, res) => {
  const payment = await paymentService.markPayment(req.body.userId, req.body.amount, req.body.paid);
  res.status(201).json(payment);
});

export default router;
