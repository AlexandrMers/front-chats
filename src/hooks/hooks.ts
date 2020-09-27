import { useMemo, useReducer } from "react";
import formatRelative from "date-fns/formatRelative";
import { ru } from "date-fns/locale";

export function useFormatRelativeDate(date: string) {
  const dateFormatted = useMemo(
    () =>
      date
        ? formatRelative(new Date(date), Date.now(), {
            locale: ru,
            weekStartsOn: 1
          })
        : null,
    [date]
  );

  return {
    date: dateFormatted
  };
}

export const useForceUpdate = () => {
  // eslint-disable-next-line
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  return forceUpdate;
};
