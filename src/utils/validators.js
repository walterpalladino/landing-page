/** Returns true when a string is a valid e-mail address. */
export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Returns true when the string is non-empty after trimming. */
export const isNonEmpty = (value) =>
  typeof value === "string" && value.trim().length > 0;
