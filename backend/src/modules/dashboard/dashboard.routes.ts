import { Router } from 'express';
import dashboardController from './dashboard.controller';

const router = Router();
router.use('/', dashboardController);

export default router;
