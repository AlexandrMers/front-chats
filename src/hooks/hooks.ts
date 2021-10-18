import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react";
import formatRelative from "date-fns/formatRelative";
import { ru } from "date-fns/locale";
import debounce from "lodash/debounce";
import {
  calculateScrollBottom,
  saveScrollPosition,
  scrollToBottom
} from "../libs/scroll";
import { ScrollbarsOverrideType } from "../types/helpersType";

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
  scroll,
  callback
}: {
  observableElement: React.RefObject<HTMLElement>;
  observerConfig: MutationObserverInit;
  scroll: RefObject<ScrollbarsOverrideType>;
  callback?: (isLoaded: boolean) => void;
}) {
  const observer = useRef<MutationObserver>();

  const initialScrolledBottom = useRef(false);
  const isPined = useRef(true);
  const initializeObserver = useRef(false);
  const isUpPosition = useRef(false);

  const oldHeightScroll = useRef(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    if (!scroll?.current) return undefined;
    const height = scroll.current.getScrollHeight();
    setScrollHeight(height);
  });

  useEffect(() => {
    oldHeightScroll.current = scrollHeight;
  }, [scrollHeight]);

  useLayoutEffect(() => {
    if (!observableElement.current || !scroll?.current) {
      return undefined;
    }

    observer.current = new MutationObserver(() => {
      if (!initialScrolledBottom.current) {
        scrollToBottom(scroll.current.view, "auto");
        initialScrolledBottom.current = true;
        return;
      }

      if (isUpPosition.current) {
        saveScrollPosition(scroll.current.view, oldHeightScroll.current);
        oldHeightScroll.current = scroll.current.getScrollHeight();
      }

      if (!isPined.current) {
        return;
      }

      scrollToBottom(scroll.current.view, "smooth");
    });

    observer.current.observe(observableElement.current, observerConfig);

    if (!initializeObserver.current) {
      initializeObserver.current = true;
      callback(initializeObserver.current);
    }

    return () => observer.current.disconnect();
    // eslint-disable-next-line
  }, []);

  useScrollObserver({
    scroll: scroll,
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

  return {
    scrollToBottom: (behavior: "auto" | "smooth" = "smooth") => {
      isPined.current = true;
      scrollToBottom(scroll?.current?.view, behavior);
    }
  };
}

export const useScrollObserver = (
  {
    scroll,
    debounceDelay,
    callback
  }: {
    scroll: RefObject<ScrollbarsOverrideType>;
    debounceDelay: number;
    callback: (event: { target: HTMLInputElement }) => void;
  },
  deps: any[] = []
) => {
  const debouncedRefScroll = useRef<any>();

  useLayoutEffect(() => {
    const scrollView = scroll?.current?.view;
    if (!scrollView) return undefined;

    debouncedRefScroll.current = debounce(callback, debounceDelay);

    scrollView.addEventListener("scroll", debouncedRefScroll.current);
    return () =>
      scrollView.removeEventListener("scroll", debouncedRefScroll.current);
  }, [...deps]);
};
