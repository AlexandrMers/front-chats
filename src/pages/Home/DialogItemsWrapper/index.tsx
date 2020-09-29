import React, { FC, memo, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import { renderSortedDialogs } from "./tools";

const DialogItemsWrapper: FC<any> = () => {
  const [selectedDialogId, setSelectedDialogId] = useState<string>(null);

  return (
    <Wrapper className={classNames(styleModule.dialogItemsWrapper)}>
      <ScrollBar
        style={{
          paddingRight: 6
        }}
        autoHide
        hideTracksWhenNotNeeded
      >
        <>{renderSortedDialogs(selectedDialogId, setSelectedDialogId)}</>
      </ScrollBar>
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
