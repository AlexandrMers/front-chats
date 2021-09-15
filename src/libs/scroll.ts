export const scrollToBottom = (
  element: HTMLElement,
  behavior: ScrollBehavior
) => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: behavior
  });
};

export const calculateScrollBottom = (element: HTMLElement) => {
  return element.scrollHeight - element.scrollTop - element.clientHeight;
};

export function saveScrollPosition(
  element: HTMLElement,
  oldHeightScroll: number
) {
  element.scrollTo({
    top: Math.abs(element.scrollHeight - oldHeightScroll)
  });
}
