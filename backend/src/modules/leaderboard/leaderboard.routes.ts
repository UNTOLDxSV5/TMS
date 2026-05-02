import { Router } from 'express';
import leaderboardController from './leaderboard.controller';

const router = Router();
router.use('/', leaderboardController);

export default router;
