import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { json } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import competitionRoutes from './modules/competitions/competition.routes';
import registrationRoutes from './modules/registrations/registration.routes';
import taskRoutes from './modules/tasks/task.routes';
import submissionRoutes from './modules/submissions/submission.routes';
import trackEventRoutes from './modules/trackEvents/trackEvent.routes';
import paymentRoutes from './modules/payments/payment.routes';
import leaderboardRoutes from './modules/leaderboard/leaderboard.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(json({ limit: '10mb' }));
app.use(morgan('combined'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/track-events', trackEventRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

export default app;
