import { hasPath, path } from "ramda";

export enum OrderSort {
  ASC = "asc",
  DESC = "desc"
}

function compareByDate<T>(pathToCode: string[]) {
  return (a: T, b: T) => {
    const dateA = new Date(path(pathToCode, a).toString());
    const dateB = new Date(path(pathToCode, b).toString());

    return dateA.getTime() - dateB.getTime();
  };
}

export const sortByDate = <T>({
  pathToCode,
  order
}: {
  pathToCode: string[];
  order: OrderSort;
}) => (array: T[]): T[] => {
  const isHasPathIntoEveryElement = array
    .map(hasPath(pathToCode))
    .every(Boolean);

  if (!isHasPathIntoEveryElement) {
    return array;
  }

  const sortedArrayByDates = array.sort(compareByDate<T>(pathToCode));

  return order === OrderSort.ASC
    ? sortedArrayByDates
    : sortedArrayByDates.reverse();
};
