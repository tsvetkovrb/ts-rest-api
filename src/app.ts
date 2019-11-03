import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ name: 'Hello' });
});

app.listen(3001, () => {
  console.log('server is running');
});
