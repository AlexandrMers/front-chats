import React, { memo } from "react";

import styleModule from "./style.module.scss";

const Loader = () => {
  return (
    <div className={styleModule.loaderWrapper}>
      <div className={styleModule.loader}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default memo(Loader);
