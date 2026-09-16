export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const GenderValues = {
  Female: 'female',
  Male: 'male',
  Other: 'other',
} as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type StandardPatientInfo = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;