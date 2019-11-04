import { Request, Response, NextFunction, Router } from 'express';
import { isAuth } from '../utils/verifyToken';

const router = Router();

interface IRequest extends Request {
  user?: {};
}

router.get('/', isAuth, (req: IRequest, res: Response, next: NextFunction) => {
  res.json({ name: 'Verified', user: req.user });
});

export { router as postsRouter };
