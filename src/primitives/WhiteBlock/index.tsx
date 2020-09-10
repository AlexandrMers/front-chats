import React, { memo, ReactNode } from "react";
import classNames from "classnames";

import "./style.scss";

interface WhiteBlockPropsInterface {
  children: ReactNode;
  className?: any;
  withShadow?: boolean;
}

const WhiteBlock = ({
  children,
  className,
  withShadow,
}: WhiteBlockPropsInterface) => {
  return (
    <div
      className={classNames(
        "white-block",
        {
          "white-block_with-shadow": withShadow,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default memo(WhiteBlock);
