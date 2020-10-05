import React, { FC, memo } from "react";
import classNames from "classnames";

import styleModule from "./style.module.scss";

interface CircleCmpPropsInterface {
  size?: number;
  color?: string;
  className?: string;
  appendProps?: any;
}

const Circle: FC<CircleCmpPropsInterface> = ({
  className,
  size = 20,
  color,
  appendProps
}) => {
  return (
    <div
      {...appendProps}
      className={classNames(className, styleModule.circle)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        backgroundColor: !!color && color
      }}
    />
  );
};

export default memo(Circle);
