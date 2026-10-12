import express from 'express';
import patientService from '../services/patientService.ts';
import parseNewPatientEntry from '../utils.ts';
import {parseNewHospitalEntry, parseNewOccupationalHealthcareEntry, parseNewHealthCheckEntry} from '../utils.ts';
import type { EntryWithoutId } from '../types.ts';


const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getStandardPatientData();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientData(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    let patientID = '';
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    } else {
      patientID =  patient.id;
    }

    const body = req.body as EntryWithoutId;

    const newEntry =
      body.type === 'Hospital'
        ? parseNewHospitalEntry(req.body)
        : body.type === 'OccupationalHealthcare'
        ? parseNewOccupationalHealthcareEntry(req.body)
        : body.type === 'HealthCheck'
        ? parseNewHealthCheckEntry(req.body)
        : null;


    if (!newEntry) {
      res.status(400).json({ error: 'Unsupported entry type' });
      return;
    } 

    const updatedPatientInfo = {
      patientID,
      entryWithNoId: newEntry,
    }; 

    const createdEntry = patientService.updateEntryData(updatedPatientInfo);

    if (!createdEntry) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    res.json(createdEntry);
  } catch (error: unknown) {

    if (error instanceof Error)
      res.status(400).send(error.message);
  }

});

export default router;
