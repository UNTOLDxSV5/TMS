import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { submissionService } from './submission.service';
import { requireAuth } from '../../middleware/auth';

const router = Router();

const submissionSchema = z.object({
  taskId: z.string().uuid(),
  filename: z.string().min(1),
  fileContent: z.string().min(1),
});

const statusSchema = z.object({ status: z.enum(['SUBMITTED', 'REVIEWED', 'APPROVED', 'REJECTED']) });

router.use(requireAuth);

router.post('/', validateBody(submissionSchema), async (req, res) => {
  const payload = { ...req.body, userId: req.authUser!.id };
  const submission = await submissionService.uploadSubmission(payload);
  res.status(201).json(submission);
});

router.get('/me', async (req, res) => {
  const submissions = await submissionService.listByUser(req.authUser!.id);
  res.json(submissions);
});

router.get('/task/:taskId', async (req, res) => {
  const submissions = await submissionService.listByTask(req.params.taskId);
  res.json(submissions);
});

router.patch('/:id/status', validateBody(statusSchema), async (req, res) => {
  const submission = await submissionService.updateStatus(req.params.id, req.body.status);
  res.json(submission);
});

export default router;
