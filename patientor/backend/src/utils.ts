import  { type NewPatientEntry, GenderValues } from './types.ts';
import  { HealthCheckRatingValues } from './types.ts';
import  { type EntryWithoutId,  } from './types.ts';
import { z } from 'zod';

export const parseNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object 
      && 'specialist' in object && 'diagnosisCodes' in object 
      && 'healthCheckRating' in object)  {

    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      date: z.iso.date({message : "date is required"}).parse(object.date),
      description: z.string().trim().min(1, {message : "description information is required"}).parse(object.description),     
      specialist: z.string().trim().min(1, {message : "specialist information is required"}).parse(object.specialist),
      diagnosisCodes: z.array(z.string()).parse(object.diagnosisCodes),
      healthCheckRating:  z.union([
        z.literal(HealthCheckRatingValues.Healthy),
        z.literal(HealthCheckRatingValues.LowRisk),
        z.literal(HealthCheckRatingValues.HighRisk),
        z.literal(HealthCheckRatingValues.CriticalRisk),
      ]).parse(object.healthCheckRating)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export const parseNewOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object 
      && 'specialist' in object && 'diagnosisCodes' in object 
      && 'sickLeave' in object
      && 'employerName' in object)  {

    const newEntry: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      date: z.iso.date({message : "date is required"}).parse(object.date),
      description: z.string().trim().min(1, {message : "description information is required"}).parse(object.description),
      specialist: z.string().trim().min(1, {message : "specialist information is required"}).parse(object.specialist),
      diagnosisCodes: z.array(z.string()).parse(object.diagnosisCodes),
      sickLeave: z.object({
        startDate: z.union([z.string().date(), z.literal("")]).default(""),
        endDate: z.union([z.string().date(), z.literal("")]).default("")
      }).parse(object.sickLeave),
      employerName: z.string().trim().min(1, {message : "Employer name information is required"}).parse(object.employerName)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export const parseNewHospitalEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object 
      && 'specialist' in object && 'diagnosisCodes' in object
      && 'discharge' in object)  {

    const newEntry: EntryWithoutId = {
      type: 'Hospital',
      date: z.iso.date({message : "date is required"}).parse(object.date),
      description: z.string().trim().min(1, {message : "description information is required"}).parse(object.description),      
      specialist: z.string().trim().min(1, {message : "specialist information is required"}).parse(object.specialist),
      diagnosisCodes: z.array(z.string()).parse(object.diagnosisCodes),
      discharge: z.object({
        date: z.iso.date({message : "discharge date is required"}),
        criteria: z.string().trim().min(1, {message : "criteria information is required"})
      }).parse(object.discharge)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
    && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatientEntry = {
      name: z.string().trim().min(1, {message : "Name is required"}).parse(object.name),
      dateOfBirth: z.iso.date({message : "date of birth is required"}).parse(object.dateOfBirth),
      ssn: z.string().trim().min(1, {message : "Social Security Number is required"}).parse(object.ssn),
      gender: z.enum(GenderValues).parse(object.gender),
      occupation: z.string().trim().min(1, {message : "Occupation is required"}).parse(object.occupation),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatientEntry;