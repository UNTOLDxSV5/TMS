import { AnyZodObject, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validateBody(schema: AnyZodObject | ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: 'Validation error', details: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
}
