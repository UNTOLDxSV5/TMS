import { Router } from 'express';
import { leaderboardService } from './leaderboard.service';
import { requireAuth, requireRole } from '../../middleware/auth';

const router = Router();
router.use(requireAuth);
router.get('/:competitionId', requireRole('SUPER_ADMIN', 'COMPETITION_ADMIN', 'FINANCE_ADMIN', 'TEAM'), async (req, res) => {
  const leaderboard = await leaderboardService.compute(req.params.competitionId);
  res.json(leaderboard);
});

export default router;
