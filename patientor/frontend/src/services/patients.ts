import axios from "axios";
import { Patient, PatientFormValues,  EntryCreationProps, Entry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async ({id, newEntry}: EntryCreationProps) => {
  try { 
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      newEntry
  );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        const [{ message }] = error.response.data || 'Invalid input data.';

        throw new Error(`Error: ${message}`);
      }     
      throw new Error('A server error occurred. Please try again.'); 
    }
    throw new Error('A network error occurred.');
  }
};


export default {
  getAll, create, createEntry
};

