import React, { FC, memo } from "react";

import styleModule from "./style.module.scss";

interface CounterPropsInterface {
  value: number;
  size?: number;
}

const Counter: FC<CounterPropsInterface> = ({ value, size = 18 }) => (
  <div
    style={{
      width: size,
      minWidth: size,
      height: size,
      minHeight: size,
    }}
    className={styleModule.badgeCounter}
  >
    <span className={styleModule.badgeCounter__inner}>{value}</span>
  </div>
);

export default memo(Counter);
