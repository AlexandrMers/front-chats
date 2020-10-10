import React, { CSSProperties, FC, memo } from "react";
import classNames from "classnames";

interface WrapperPropsInterface {
  children: React.ReactNode;
  className?: any;
  styles?: CSSProperties;
  appendProps?: any;
}

const Wrapper: FC<WrapperPropsInterface> = ({
  children,
  className,
  styles,
  appendProps
}) => {
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
