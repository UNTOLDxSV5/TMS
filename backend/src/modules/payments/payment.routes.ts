import { Router } from 'express';
import paymentController from './payment.controller';

const router = Router();
router.use('/', paymentController);

export default router;
