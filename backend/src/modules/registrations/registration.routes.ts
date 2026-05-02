import { Router } from 'express';
import registrationController from './registration.controller';

const router = Router();
router.use('/', registrationController);

export default router;
