import { useMemo } from "react";
import formatRelative from "date-fns/formatRelative";
import { ru } from "date-fns/locale";

export function useFormatRelativeDate(date: string) {
  const dateFormatted = useMemo(
    () =>
      formatRelative(new Date(date), Date.now(), {
        locale: ru,
        weekStartsOn: 1,
      }),
    [date]
  );

  return {
    date: dateFormatted,
  };
}
