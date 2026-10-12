import patientData from '../../data/patients.ts';
import type { Patient, StandardPatientInfo, NewPatientEntry, EntryWithoutId, Entry } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';


const getPatientData = (): Patient[]  => {
  return patientData;
};

const findById = (id: string): Patient | undefined => {  
  const entry = patientData.find(p => p.id === id);  
  return entry;
};

const getStandardPatientData = (): StandardPatientInfo[]  => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({    
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatientData = (entry: NewPatientEntry): Patient => {
  const newEntry = { 
    id: uuidv4(),
    ...entry, 
    entries: [] 
  }; 

  patientData.push(newEntry);
  return newEntry;
};

interface Props {
  entryWithNoId: EntryWithoutId;
  patientID: string;

}

const updateEntryData = ({ entryWithNoId, patientID }: Props): Entry | undefined => {
  const patientEntry = findById(patientID);

  if (!patientEntry) {
    return undefined;
  }

  const createdEntry: Entry = {
    id: uuidv4(),
    ...entryWithNoId
  };

  patientEntry.entries = [
    ...patientEntry.entries,
    createdEntry
  ];

  const patientToUpdate = patientData.find(p => p.id === patientEntry.id);

  if (patientToUpdate) {
    patientToUpdate.entries = patientEntry.entries;
  }

  return createdEntry;
};

export default {
  getPatientData,
  findById,
  getStandardPatientData,
  addPatientData,
  updateEntryData
};