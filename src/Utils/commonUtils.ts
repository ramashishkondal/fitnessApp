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

export const getTimePassed = (timeInMillis: number): string => {
  const currentTime = new Date().getTime();
  const timePassedInSecs = (currentTime - timeInMillis) / 1000;
  const timePassedInMns = Math.ceil(timePassedInSecs / 60);
  const timePassedInHrs = ~~(timePassedInMns / 60);
  if (timePassedInSecs <= 60) {
    return `${~~timePassedInSecs} secs ago`;
  } else if (timePassedInMns <= 60) {
    return `${timePassedInMns} minutes ago`;
  } else if (timePassedInHrs <= 23) {
    return `${timePassedInHrs} hours ago`;
  } else {
    return `${~~(timePassedInHrs / 24)} ${
      ~~(timePassedInHrs / 24) > 1 ? "days" : "day"
    } ago`;
  }
};

export const date = {
  today: () => new Date(),
  getStartOfDay: (someDate: Date) =>
    new Date(someDate.getFullYear(), someDate.getMonth(), someDate.getDate()),
  getPreviousDayDate: (today: Date) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
};
