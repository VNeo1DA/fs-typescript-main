import express from 'express';
import diaryRouter from './routes/diaries.ts';
import cors from 'cors';

const app = express();
const corsMiddleware = (cors as unknown as () => express.RequestHandler)();
app.use(corsMiddleware);
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});