import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { validateBody } from '../../middleware/validate';
import { z } from 'zod';
import { authService } from './auth.service';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './jwt';
import { authRepository } from './auth.repository';
import { requireAuth } from '../../middleware/auth';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const refreshSchema = z.object({ refreshToken: z.string() });

router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.authenticate(email, password);
  if (!result) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ user: { id: result.user.id, email: result.user.email, role: result.user.role, competitionId: result.user.competitionId }, accessToken: result.accessToken, refreshToken: result.refreshToken });
});

router.post('/refresh', validateBody(refreshSchema), async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const accessToken = createAccessToken({ sub: user.id, role: user.role, email: user.email, competitionId: user.competitionId ?? undefined });
    const newRefreshToken = createRefreshToken({ sub: user.id, role: user.role, email: user.email, competitionId: user.competitionId ?? undefined });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token invalid' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  const authUser = req.authUser!;
  res.json({ id: authUser.id, email: authUser.email, role: authUser.role, competitionId: authUser.competitionId });
});

export default router;
