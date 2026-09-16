import express from 'express';
import patientService from '../services/patientService.ts';
import parseNewPatientEntry from '../utils.ts';
//import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getStandardPatientData();
  res.send(data);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientData(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;