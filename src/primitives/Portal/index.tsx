import { FC, memo, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalCmpInterface {
  selector: string;
  children: ReactNode;
}

const Portal: FC<PortalCmpInterface> = ({ children, selector }) => {
  const [element, setElement] = useState<Element>(null);

  useEffect(() => {
    if (element) return undefined;
    setElement(document.querySelector(selector));
  }, [selector, element]);

  return element && createPortal(children, element);
};

export default memo(Portal);
