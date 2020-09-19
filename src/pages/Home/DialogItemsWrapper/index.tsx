import React, { FC, memo } from "react";

import classNames from "classnames";
import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import DialogItem from "components/DialogItem";

const DialogItemsWrapper: FC<any> = () => {
  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <DialogItem />
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
