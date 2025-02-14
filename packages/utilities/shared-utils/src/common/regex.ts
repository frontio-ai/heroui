export const isPatternNumeric = (pattern: string) => {
  const numericPattern = /(^|\W)[0-9](\W|$)/;

  return numericPattern.test(pattern) && !/[^\d\^$\[\]\(\)\*\+\-\.\|]/.test(pattern);
};
