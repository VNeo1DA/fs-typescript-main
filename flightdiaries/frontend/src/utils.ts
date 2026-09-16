/*import  {   type Weather, type Visibility, type  Diary } from './types.ts';
import  {  WeatherValues, VisibilityValues  } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

 
const isNumber = (text: unknown): text is number => {
  return typeof text === 'number';
};


export const parseID = (id: unknown): number => {
  if (!id || !isNumber(id)) {
    throw new Error('Incorrect or missing data ID field not generated');
  }

  return id;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};




export const isWeather = (param: string): param is Weather => {
  return (Object.values(WeatherValues) as string[]).includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return (Object.values(VisibilityValues) as string[]).includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

export const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing Comment');
  }

  return comment;
}

export const parseNewDiaryEntry = (object: unknown): Diary => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('id' in object && 'date' in object && 'weather' in object 
    && 'visibility' in object && 'comment'in object )  {
    const newEntry: Diary = {
      id: parseID(object.id),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment)
    };

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export const idDiary = (object: unknown): boolean => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('id' in object && 'date' in object && 'weather' in object 
    && 'visibility' in object && 'comment'in object )  {
    return true;
  }
  return false;
}*/