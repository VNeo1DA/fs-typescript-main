import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (weeklyHours: number[], targetAmount: number): Result => {
  if (weeklyHours.length <= 0) throw new Error('Not enough numbers');
  
  const numDays = weeklyHours.length;
  const trainingHours = weeklyHours.filter( hours => hours !== 0);
  const numOfTrainingDays = trainingHours.length;
  const avgHours = trainingHours.reduce((accumulator, hours) => accumulator + hours, 0) / numDays;
  const outcome = (avgHours >= targetAmount) ? true : false;
  const rating = (avgHours/targetAmount <= 0.5) ? 1
              : (avgHours/targetAmount >= 0.5 && avgHours/targetAmount <= 1) ? 2
              : 3;
  const trainingReview = (rating === 1) ? 'have to put in more work to reach target'
                      : (rating === 2) ? 'good work but could improve'
                      : 'excellent work, exceeded expectations';

  return {
    periodLength: numDays,
    trainingDays: numOfTrainingDays,
    success: outcome,
    rating: rating,
    ratingDescription: trainingReview,
    target: targetAmount,
    average: avgHours
  };
};

 
interface Numeros {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): Numeros => {
  if (args.length < 4) throw new Error('not enough arguments');

  const[ , ,targetAmount, ...exerciseHours] = args;  
  //(a) checks 1 && transform elements to Number(since they are string)
  const isListAllNumbers: boolean = exerciseHours.every( hour => !isNotNumber(hour));
  
  if(!isNotNumber(targetAmount) && isListAllNumbers) {
    //(b) transform strings to numbers 
    const dailyHours = exerciseHours.map( hour => Number(hour));
    return {
      target: Number(targetAmount),
      hours: dailyHours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }

};



try {
  const{target, hours}= parseArguments(process.argv);
  //console.log(`target ${target}, hours: ${hours}`);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}