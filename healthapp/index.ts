import express from 'express';
import type { Request, Response } from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator.ts';
import { isNotNumber } from "./utils.ts";
import { calculateExercises } from "./exerciseCalculator.ts"; 
app.use(express.json());

const PORT = 3000;
app.get('/hello', (_req, res: Response) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const { height, weight } = req.query;

    if ( !height || isNotNumber(height) || !weight || isNotNumber(weight)) {    
     return res.status(400).send({ error: 'malformatted parameters'});  
    };
    
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({
        height: Number(height),
        weight: Number(weight), 
        bmi
    });
});

app.post('/exercises', (req: Request, res: Response) => {
    
    const { daily_exercises, target } = req.body as { daily_exercises: number[]; target: number};     

    let isListAllNumbers: boolean = false;
    let containsDailyExercises: boolean = false;
    if (daily_exercises){
      isListAllNumbers = daily_exercises.every(( hour ) => !isNotNumber(hour));
       containsDailyExercises = Array.isArray(daily_exercises);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ( !target || !daily_exercises || !containsDailyExercises ) { 
     return res.status(400).send({ error: 'parameters missing'});
     }else if ( !isListAllNumbers || isNotNumber(target) ) { 
     return res.status(400).send({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.send( result );
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});