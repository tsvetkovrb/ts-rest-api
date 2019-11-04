import { Request, Response, NextFunction, Router } from 'express';
import { isAuth } from '../utils/verifyToken';

const router = Router();

router.get(
  '/',
  isAuth,
  (req: Request & { user?: {} }, res: Response, next: NextFunction) => {
    res.json({ name: 'Verified', user: req.user });
  },
);

export { router as postsRouter };
