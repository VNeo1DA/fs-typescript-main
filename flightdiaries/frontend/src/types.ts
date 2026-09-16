/*export const WeatherValues = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof WeatherValues[keyof typeof WeatherValues];

export const VisibilityValues = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const; 

export type Visibility = typeof VisibilityValues[keyof typeof VisibilityValues]; */

export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export const WeatherOptions = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type WeatherOption = (typeof WeatherOptions)[keyof typeof WeatherOptions];
export const VisibilityOptions = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type VisibilityOption = (typeof VisibilityOptions)[keyof typeof VisibilityOptions];

export type NewDiary = Omit<Diary, "id">;