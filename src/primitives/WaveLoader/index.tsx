import React, { FC } from "react";

import styleModule from "./style.module.scss";

import classNames from "classnames";

interface WaveLoaderPropsInterface {
  countDots?: number;
}

function spanRender(countDots: number) {
  return new Array(countDots)
    .fill(null)
    .map((_, index) => <span key={index} />);
}

const WaveLoader: FC<WaveLoaderPropsInterface> = ({ countDots = 3 }) => {
  return (
    <div className={classNames(styleModule.typingIndicator)}>
      {spanRender(countDots)}
    </div>
  );
};

export default React.memo(WaveLoader);
