export const snakeCase = (s: string) => {
  if (s === s.toUpperCase()) return s.toLowerCase();
  return s
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};