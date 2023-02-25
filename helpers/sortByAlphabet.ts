export const sortByAlphabet = (array: string[]) => {
  return array.sort((x, y) => x.localeCompare(y));
};
