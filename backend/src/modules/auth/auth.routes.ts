import { Router } from 'express';
import authController from './auth.controller';

const router = Router();
router.use('/', authController);

export default router;
