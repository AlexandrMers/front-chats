import React, { FC, memo } from "react";

import classNames from "classnames";
import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import DialogItem from "components/DialogItem";

const fakeData = [{}];

const DialogItemsWrapper: FC<any> = () => {
  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <DialogItem key={1} isOnline />
      <DialogItem key={2} isSelected />
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
