import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.jwtAccessSecret) as {
      sub: string;
      role: string;
      email: string;
      competitionId?: string;
    };

    req.authUser = {
      id: payload.sub,
      role: payload.role as any,
      email: payload.email,
      competitionId: payload.competitionId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.authUser.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}
