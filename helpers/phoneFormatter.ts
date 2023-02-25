// 9822765562 => +7 (982) 276 55 62
export const phoneFormatter = (str: string) => {
  const phoneMatch = str?.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  return typeof phoneMatch !== 'undefined' && phoneMatch !== null
    ? `+7 (${phoneMatch[1]}) ${phoneMatch[2]} ${phoneMatch[3]} ${phoneMatch[4]}`
    : '';
};
