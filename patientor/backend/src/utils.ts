import  { type NewPatientEntry, GenderValues } from './types.ts';
import { z } from 'zod';

/*
const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export const parseSSN = (snn: unknown): string => {
  if (!snn || !isString(snn)) {
    throw new Error('Incorrect or missing social security number');
  }

  return snn;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(GenderValues) as string[]).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing Occupation/Job role');
  }

  return occupation;
}; */

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object 
    && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatientEntry = {
      name: z.string().parse(object.name),
      dateOfBirth: z.iso.date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),

      gender: z.enum(GenderValues).parse(object.gender),

      occupation: z.string().parse(object.occupation)

    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatientEntry;