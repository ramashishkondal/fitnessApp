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
export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getTimePassed = (timeInMillis: number): string => {
  const currentTime = new Date().getTime();
  const timePassedInSecs = (currentTime - timeInMillis) / 1000;
  const timePassedInMns = Math.ceil(timePassedInSecs / 60);
  const timePassedInHrs = ~~(timePassedInMns / 60);
  if (timePassedInSecs <= 60) {
    return `${~~timePassedInSecs} ${
      ~~timePassedInSecs > 1 ? "seconds" : "second"
    } ago`;
  } else if (timePassedInMns <= 60) {
    return `${timePassedInMns} ${
      ~~timePassedInMns > 1 ? "minutes" : "minute"
    } ago`;
  } else if (timePassedInHrs <= 23) {
    return `${timePassedInHrs} ${~~timePassedInHrs > 1 ? "hours" : "hour"} ago`;
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

export type TimerId = string | number | NodeJS.Timeout | undefined;
export class Timer {
  callback: () => void;
  remainingTime: number;
  startTime: Date;
  timerId: TimerId;

  constructor(callback: () => void) {
    this.callback = callback;
    this.remainingTime = 1000;
    this.startTime = new Date();
    this.timerId = undefined;
  }

  pause = () => {
    clearTimeout(this.timerId);
    this.remainingTime -= new Date().getTime() - this.startTime.getTime();
  };

  resume: () => void = () => {
    this.startTime = new Date();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remainingTime);
  };

  start = (delay: number) => {
    this.remainingTime = delay;
    this.timerId = setTimeout(this.callback, this.remainingTime);
  };
  clear = () => {
    clearTimeout(this.timerId);
  };
}

export const checkWeek = (toCheckDate: Date, checkDateWith: Date) => {
  if (
    checkDateWith.getMonth() !== toCheckDate.getMonth() ||
    checkDateWith.getFullYear() !== toCheckDate.getFullYear()
  ) {
    return false;
  }
  if (checkDateWith.getDate() - toCheckDate.getDate() <= 7) {
    return true;
  }
};
