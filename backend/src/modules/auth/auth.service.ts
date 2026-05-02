import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './jwt';

export const authService = {
  authenticate: async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
      competitionId: user.competitionId ?? undefined,
    };

    return {
      user,
      accessToken: createAccessToken(payload),
      refreshToken: createRefreshToken(payload),
    };
  },
  refreshTokens: async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findById(payload.sub);
    if (!user) throw new Error('Invalid refresh token');

    const newPayload = {
      sub: user.id,
      role: user.role,
      email: user.email,
      competitionId: user.competitionId ?? undefined,
    };

    return {
      accessToken: createAccessToken(newPayload),
      refreshToken: createRefreshToken(newPayload),
    };
  },
};
