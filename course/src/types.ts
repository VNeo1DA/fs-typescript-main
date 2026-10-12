export interface courseTitle {
  name: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}


export interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export interface CourseListProps{
  courseParts: CoursePart[];
}

export interface CoursePartProps{
  part: CoursePart;
}

export interface totalExercises {
  totalCount: number;
}