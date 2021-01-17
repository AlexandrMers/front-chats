import { path } from "ramda";

export function filterChange<T, U>({
  pathToElem,
  elements,
  matchField,
  filterCallback
}: {
  matchField: U;
  pathToElem: string[];
  elements: T[];
  filterCallback: (field: U, matchField: U) => boolean;
}) {
  return !matchField
    ? elements
    : elements.filter((item) => {
        const filterField = path<U>(pathToElem, item);
        return !!filterField && filterCallback(filterField, matchField);
      });
}
