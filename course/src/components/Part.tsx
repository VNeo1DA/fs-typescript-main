import type { CoursePartProps } from '../types.ts'
import { assertNever } from "../utils.ts";

const Part = ({ part } : CoursePartProps ) => {

    switch(part.kind) {
      case "basic":
        return ( 
          <div>
            <p><strong>{part.name} {part.exerciseCount}</strong> 
              <br/>{part.description}
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <p><strong>{part.name} {part.exerciseCount}</strong> 
              <br/>project exercises {part.groupProjectCount}
            </p>
          </div>
        );
      case "background":
        return ( 
          <div>
            <p><strong>{part.name} {part.exerciseCount}</strong> 
              <br/>{part.description}
              <br/>{part.backgroundMaterial}
            </p>
          </div>
        );
      case "special":
        return ( 
          <div>
            <p><strong>{part.name} {part.exerciseCount}</strong> 
              <br/>{part.description}
              <br/>required skills: { part.requirements?.join(', ') || 'no prior skill(s) needed' }
            </p>
          </div>
        );
      default:
        return assertNever(part);
  }

};

export default Part;