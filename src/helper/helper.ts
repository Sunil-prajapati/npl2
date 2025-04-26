/**
 * Checks if a given date is the same as the current date
 * @param dateToCheck - Date string in format 'YYYY-MM-DD'
 * @returns boolean - True if dates are the same, false otherwise
 */
export const isSameAsCurrentDate = (dateToCheck: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return today === dateToCheck;
  };