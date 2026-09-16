import patientData from '../../data/patients.ts';
import type { Patient, StandardPatientInfo, NewPatientEntry } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';


const getPatientData = (): Patient[]  => {
  return patientData;
};

const getStandardPatientData = (): StandardPatientInfo[]  => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientData = (entry: NewPatientEntry): Patient => {
  const newEntry = { 
    id: uuidv4(),
    ...entry  
  }; 

  patientData.push(newEntry);
  return newEntry;
};

export default {
  getPatientData,
  getStandardPatientData,
  addPatientData
};