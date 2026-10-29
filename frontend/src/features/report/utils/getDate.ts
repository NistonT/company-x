export const getFirstDayOfMonth = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).toISOString().split("T")[0];
};

export const getLastDayOfMonth = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).toISOString().split("T")[0];
};
