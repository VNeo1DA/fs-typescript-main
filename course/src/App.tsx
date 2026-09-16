interface courseTitle {
  name: string;
}

const Header = ({ name }: courseTitle) => {
   return <h1>{name}</h1>;
};


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}


interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


interface ContentProps{
  courseParts: CoursePart[];
}

interface CoursePartProps{
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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


const Content = ({ courseParts } : ContentProps ) => {
   return (
     <div>
       {courseParts.map((part, index) => (
         <Part key={index} part={ part } />
       ))}
     </div>
  );
};

/*
interface courseContent {
  name: string;
  exerciseCount: number;
}

interface courseListProps{
  courses: courseContent[];
}

const Content = ({ courses }: courseListProps) => {
   return (
     <div>
      <p>
        {courses[0].name} {courses[0].exerciseCount}
      </p>
      <p>
        {courses[1].name} {courses[1].exerciseCount}
      </p>
      <p>
        {courses[2].name} {courses[2].exerciseCount}
      </p>

     </div>
  );
}; */

interface totalExercises {
  totalCount: number;
}

const Total = ({ totalCount }: totalExercises) => {
   return <p>Number of exercises  {totalCount}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  { 
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }  
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={ courseName } />
      <Content courseParts={ courseParts } />
      <Total totalCount={ totalExercises }/>
    </div>
  );
};

export default App;