import type { totalExercises } from '../types.ts'

const Total = ({ totalCount }: totalExercises) => {
   return <p>Number of exercises  {totalCount}</p>;
};

export default Total;