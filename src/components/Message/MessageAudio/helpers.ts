import { compose, curry } from "ramda";

export const separateDurationByMinutesWithSeconds = (duration: string) => {
  const separatedTime = duration.split(".");

  return `${separatedTime[0]}:${separatedTime[1]}`;
};

export const fixSymbolsNumber = curry((symbolsCount: number, number: number) =>
  number.toFixed(symbolsCount)
);

export const calculateTimeInPercents = (
  duration: number,
  currentTime: number
) => (currentTime / duration) * 100;

export function calculateRestOfTimeToPercents(
  duration: number,
  currentTime: number
) {
  return (duration - currentTime) / 100;
}

export function formatRestOfTime(restOfTime: number) {
  return compose(
    separateDurationByMinutesWithSeconds,
    fixSymbolsNumber(2) as (num: number) => string
  )(restOfTime);
}
