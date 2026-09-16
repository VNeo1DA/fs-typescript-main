import { isNotNumber } from "./utils.ts";

interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }

};

export const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0 ) throw new Error('BMI\'s weight or height Can\'t be 0 or less!');
 
  const heightInMeters: number = height/100;
  const bmi: number = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight range';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight range';
  } else {
    return 'Obese range';
  }
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
    const { height, weight } = parseArguments(process.argv);
    //console.log(calculateBmi(120, 70));
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
