import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

const jwtOptions = (expiresIn: string) => ({ expiresIn: expiresIn as any });

export function createAccessToken(payload: { sub: string; role: string; email: string; competitionId?: string }) {
  return jwt.sign(payload as any, env.jwtAccessSecret as any, jwtOptions(env.accessTokenExpiresIn));
}

export function createRefreshToken(payload: { sub: string; role: string; email: string; competitionId?: string }) {
  return jwt.sign(payload as any, env.jwtRefreshSecret as any, jwtOptions(env.refreshTokenExpiresIn));
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwtRefreshSecret) as { sub: string; role: string; email: string; competitionId?: string };
}
