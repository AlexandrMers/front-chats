import Scrollbars from "react-custom-scrollbars";

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface ScrollViewRefInterface {
    view: HTMLElement;
    getScrollTop: () => number;
}

export type ScrollbarsOverrideType = Scrollbars & { view: HTMLElement };
