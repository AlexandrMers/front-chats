import { path } from "ramda";

export function filterChange<T, U>({
  pathToElem,
  array,
  matchField,
  filterCallback
}: {
  matchField: U;
  pathToElem: string[];
  array: T[];
  filterCallback: (field: U, matchField: U) => boolean;
}) {
  return !matchField
    ? array
    : array.filter((item) => {
        const filterField = path<U>(pathToElem, item);
        return !!filterField && filterCallback(filterField, matchField);
      });
}
