import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import router from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin ?? '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
