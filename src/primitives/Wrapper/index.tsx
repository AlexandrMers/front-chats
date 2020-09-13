import React, { memo } from "react";
import classNames from "classnames";

interface WrapperPropsInterface {
  children: React.ReactNode;
  className?: any;
  styles?: any;
}

const Wrapper = ({ children, className, styles }: WrapperPropsInterface) => {
  return (
    <div className={classNames("wrapper", className)} style={styles}>
      {children}
    </div>
  );
};

export default memo(Wrapper);
