export const safeText = (text: string): string => {
  if (text?.length <= 4) return text;

  return text?.slice(0, 3);
};

export const safeAriaLabel = (...texts: any[]): string => {
  let ariaLabel = " ";

  // loop through all texts and return the first non-empty string
  for (const text of texts) {
    if (typeof text === "string" && text.length > 0) {
      ariaLabel = text;
      break;
    }
  }

  return ariaLabel;
};
