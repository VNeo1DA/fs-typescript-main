import express from 'express';
const app = express();

import cors from 'cors';
import diagnosisRouter from './routes/diagnosesRouter.ts';
import patientRouter from './routes/patientRouter.ts';

const corsMiddleware = (cors as unknown as () => express.RequestHandler)();
app.use(corsMiddleware);
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});