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

export const getTimePassed = (timeInMillis: number): string => {
  const currentTime = new Date().getTime();
  const timePassedInSecs = (currentTime - timeInMillis) / 1000;
  const timePassedInMnts = Math.ceil(timePassedInSecs / 60);
  const timePassedInHrs = ~~(timePassedInMnts / 60);
  if (timePassedInSecs <= 60) {
    return `${~~timePassedInSecs} secs ago`;
  } else if (timePassedInMnts <= 60) {
    return `${timePassedInMnts} minutes ago`;
  } else if (timePassedInHrs <= 23) {
    return `${timePassedInHrs} hours ago`;
  } else {
    return `${~~(timePassedInHrs / 24)} ${
      ~~(timePassedInHrs / 24) > 1 ? "days" : "day"
    } ago`;
  }
};
