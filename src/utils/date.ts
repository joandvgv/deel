/**
 * Basic date validation
 * @param date
 * @returns boolean - Whether string is in YYYYMMDD format
 */
export const isValidDate = (date: string) => {
  const matches = /(\d{4})[-/](\d{2})[-/](\d{2})/.exec(date);
  if (matches === null) return false;

  const day = parseInt(matches[3]);
  const month = parseInt(matches[2]) - 1;
  const year = parseInt(matches[1]);
  const composedDate = new Date(year, month, day);

  return (
    composedDate.getDate() == day &&
    composedDate.getMonth() == month &&
    composedDate.getFullYear() == year
  );
};
