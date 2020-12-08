import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { isNil } from "ramda";
import debounce from "lodash/debounce";

export enum EventClickName {
  MouseUp = "mouseup",
  MouseDown = "mousedown"
}

type handlerType = (event: any) => void;

const clickOutsideStack: handlerType[] = [];

interface ClickOutSideInterface {
  children: ReactNode;
  handleEnabled?: boolean;
  handleClickOut: () => void;
  delay?: number;
  clickEventName?: EventClickName;
  refs?: HTMLElement[];
}
class ClickOutside extends React.Component<ClickOutSideInterface> {
  stackIndex: number;
  componentDidMount() {
    const handler = this.props.delay
      ? debounce(this.handleClickOut, this.props.delay)
      : this.handleClickOut;

    clickOutsideStack.push(handler);
    this.stackIndex = clickOutsideStack.length - 1;
    document.addEventListener(
      this.props.clickEventName || EventClickName.MouseDown,
      handler
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      this.props.clickEventName || EventClickName.MouseDown,
      clickOutsideStack.pop()
    );
  }

  hasElementIntoRefs = (refs: HTMLElement[], element: any): boolean => {
    if (!refs || !refs.length) {
      return false;
    }
    return refs.filter(Boolean).some((elem: HTMLElement) => {
      return elem.contains(element);
    });
  };

  handleClickOut = (event: any) => {
    if (clickOutsideStack.length !== this.stackIndex + 1) {
      return;
    }
    const { handleEnabled, handleClickOut, refs } = this.props;
    if (!isNil(handleEnabled) && !handleEnabled) return;
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      if (this.hasElementIntoRefs(refs, event.target)) return;
      handleClickOut();
    }
    event.stopPropagation();
  };

  render() {
    return this.props.children;
  }
}

export default ClickOutside;
