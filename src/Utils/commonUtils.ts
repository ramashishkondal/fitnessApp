export const getPercentage = (
  value: number,
  total: number,
  isCapped: boolean = true
) => {
  if (value > total && isCapped) {
    return 100;
  }
  return (value / total) * 100;
};
export const getStartOfDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};
