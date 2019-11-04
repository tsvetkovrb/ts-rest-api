import express, { Application } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

// Import routes
import { authRoute } from './routes/auth';
import { postsRouter } from './routes/posts';

const app: Application = express();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT || '',
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Connected to DB');
  },
);

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRouter);

app.listen(3001, () => {
  console.log('server is running');
});
