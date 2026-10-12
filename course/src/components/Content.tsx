import type { CourseListProps } from '../types.ts'
import Part from "./Part";

const Content = ({ courseParts } : CourseListProps ) => {
   return (
     <div>
       {courseParts.map((part, index) => (
         <Part key={index} part={ part } />
       ))}
     </div>
  );
};

export default Content;