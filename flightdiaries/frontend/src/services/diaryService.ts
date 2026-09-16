import axios from 'axios'
import type { Diary, NewDiary } from '../types'
import { apiBaseUrl } from "../constants";

const getAll =  async () => {
  const { data } = await axios.get<Diary[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const create = async (object: NewDiary) => {
  try {
  const data  = await axios.post<Diary>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        //const errorMessage = error.response.data.message || 'Invalid input data.';
        //const [{ message }] = error.response.data.error;
        let messages = '';
        const errorMessages = error.response.data.error;
         
        for (const error of errorMessages) {
          messages += error.message + ' ';
        }
        
        console.log(error.response.data);
        //console.log(messages);
        throw new Error(`Error: ${messages}`, { cause: error });
      }
      throw new Error('A server error occurred. Please try again.', { cause: error }); 
    }
    throw new Error('A network error occurred.', { cause: error });
  }
}

export default {
  getAll, create
};