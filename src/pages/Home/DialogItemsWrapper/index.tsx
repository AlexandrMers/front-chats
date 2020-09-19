import React, { FC, memo } from "react";
import Wrapper from "../../../primitives/Wrapper";
import classNames from "classnames";

import styleModule from "./style.module.scss";

const DialogItemsWrapper: FC<any> = () => {
  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <div>dialog 1</div>
      <div>dialog 2</div>
      <div>dialog 3</div>
      <div>dialog 4</div>
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
