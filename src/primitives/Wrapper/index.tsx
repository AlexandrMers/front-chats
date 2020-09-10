import React, { memo } from "react";
import classNames from "classnames";

interface WrapperPropsInterface {
  children: React.ReactNode;
  className?: any;
}

const Wrapper = ({ children, className }: WrapperPropsInterface) => {
  return <div className={classNames("wrapper", className)}>{children}</div>;
};

export default memo(Wrapper);
