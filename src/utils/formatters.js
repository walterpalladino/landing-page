/** Capitalises the first letter of each word. */
export const toTitleCase = (str) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

/** Returns the current four-digit year as a number. */
export const currentYear = () => new Date().getFullYear();
