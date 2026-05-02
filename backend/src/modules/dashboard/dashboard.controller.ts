import { Router } from 'express';
import { dashboardService } from './dashboard.service';
import { requireAuth } from '../../middleware/auth';

const router = Router();
router.use(requireAuth);

router.get('/me', async (req, res) => {
  const dashboardData = await dashboardService.teamDashboard(req.authUser!.id);
  res.json(dashboardData);
});

export default router;
