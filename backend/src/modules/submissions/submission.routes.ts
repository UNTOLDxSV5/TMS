import { Router } from 'express';
import submissionController from './submission.controller';

const router = Router();
router.use('/', submissionController);

export default router;
