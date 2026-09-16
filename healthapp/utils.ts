//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

//export default "this is the default..."