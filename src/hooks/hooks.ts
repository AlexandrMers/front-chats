import { useEffect, useMemo, useReducer, useRef, useLayoutEffect } from "react";
import formatRelative from "date-fns/formatRelative";
import { ru } from "date-fns/locale";
import debounce from "lodash/debounce";
import {
  calculateScrollBottom,
  saveScrollPosition,
  scrollToBottom
} from "../libs/scroll";
import { ScrollViewRefInterface } from "../types/helpersType";

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

export function useChatScrollManager({
  observableElement,
  observerConfig,
  scrollRef,
  callback
}: {
  observableElement: React.RefObject<HTMLElement>;
  observerConfig: MutationObserverInit;
  scrollRef: React.RefObject<ScrollViewRefInterface>;
  callback?: (isLoaded: boolean) => void;
}) {
  const observer = useRef<MutationObserver>();

  const initialScrolledBottom = useRef(false);
  const isPined = useRef(true);
  const initializeObserver = useRef(false);
  const isUpPosition = useRef(false);

  const oldHeightScroll = useRef(0);

  useScrollObserver({
    scroll: scrollRef.current?.view,
    debounceDelay: 200,
    callback: ({ target }) => {
      const pinned = calculateScrollBottom(target) === 0;
      const isUp = target.scrollTop < 50;
      if (isUpPosition.current !== isUp) {
        isUpPosition.current = isUp;
      }
      if (isPined.current !== pinned) {
        isPined.current = pinned;
      }
    }
  });

  useLayoutEffect(() => {
    if (!observableElement.current || !scrollRef.current?.view) {
      return undefined;
    }

    const element = scrollRef.current?.view;

    oldHeightScroll.current = element.scrollHeight;

    observer.current = new MutationObserver(() => {
      if (!initialScrolledBottom.current) {
        scrollToBottom(element, "auto");
        initialScrolledBottom.current = true;
        return;
      }

      if (isUpPosition.current) {
        saveScrollPosition(element, oldHeightScroll);

        oldHeightScroll.current = element.scrollHeight;
      }

      if (!isPined.current) {
        return;
      }

      scrollToBottom(element, "smooth");
    });

    observer.current.observe(observableElement.current, observerConfig);

    if (!initializeObserver.current) {
      initializeObserver.current = true;
      callback(initializeObserver.current);
    }

    return () => observer.current.disconnect();
    // eslint-disable-next-line
  }, [
    scrollRef.current,
    observableElement.current,
    isPined.current,
    initialScrolledBottom.current,
    isUpPosition.current
  ]);

  return {
    scrollToBottom: (behavior: "auto" | "smooth" = "smooth") => {
      isPined.current = true;
      scrollToBottom(scrollRef.current.view, behavior);
    }
  };
}

export const useScrollObserver = (
  {
    scroll,
    debounceDelay,
    callback
  }: {
    scroll: HTMLElement;
    debounceDelay: number;
    callback: (event: { target: HTMLInputElement }) => void;
  },
  deps: any[] = []
) => {
  const debouncedRefScroll = useRef<any>();

  useLayoutEffect(() => {
    if (!scroll) return undefined;

    debouncedRefScroll.current = debounce(callback, debounceDelay);

    scroll.addEventListener("scroll", debouncedRefScroll.current);
    return () =>
      scroll.removeEventListener("scroll", debouncedRefScroll.current);
    // eslint-disable-next-line
  }, [scroll, ...deps]);
};
