import React, { FC, memo, useMemo } from "react";

import styleModule from "./style.module.scss";

interface CounterPropsInterface {
  value: number;
  size?: number;
}

const Counter: FC<CounterPropsInterface> = ({ value, size = 18 }) => {
  const styles = useMemo(
    () => ({
      width: size,
      minWidth: size,
      height: size,
      minHeight: size
    }),
    [size]
  );

  return (
    <div style={styles} className={styleModule.badgeCounter}>
      <span className={styleModule.badgeCounter__inner}>{value}</span>
    </div>
  );
};

export default memo(Counter);
