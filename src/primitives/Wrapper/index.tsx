import React, { CSSProperties, memo } from "react";
import classNames from "classnames";

interface WrapperPropsInterface {
  children: React.ReactNode;
  className?: any;
  styles?: CSSProperties;
  appendProps?: any;
}

const Wrapper = ({
  children,
  className,
  styles,
  appendProps,
}: WrapperPropsInterface) => {
  return (
    <div
      {...appendProps}
      className={classNames("wrapper", className)}
      style={styles}
    >
      {children}
    </div>
  );
};

export default memo(Wrapper);
