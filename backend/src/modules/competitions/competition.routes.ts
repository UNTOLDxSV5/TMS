import { Router } from 'express';
import competitionController from './competition.controller';

const router = Router();
router.use('/', competitionController);

export default router;
