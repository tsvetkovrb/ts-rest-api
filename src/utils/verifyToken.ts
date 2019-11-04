import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (
  req: Request & { headers: { auth?: string }; user?: {} },
  res: Response,
  next: NextFunction,
) => {
  const { auth } = req.headers;
  try {
    const verified = jwt.verify(auth || '', process.env.TOKEN_SECRET || '');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).send('Access denied');
  }
};
