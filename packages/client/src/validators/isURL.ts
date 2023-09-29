/**
 * Checks if the value is a valid URL.
 */
export const isURL = (value: string): string | undefined => {
  try {
    new URL(value);
  } catch (_) {
    return "Please enter a valid URL";
  }

  return;
};
