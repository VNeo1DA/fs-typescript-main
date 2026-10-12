import type { courseTitle } from '../types.ts'

const Header = ({ name }: courseTitle) => {
   return <h1>{name}</h1>;
};

export default Header;