import { Router } from 'express';
import trackEventController from './trackEvent.controller';

const router = Router();
router.use('/', trackEventController);

export default router;
