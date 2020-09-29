import React, { FC, memo, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";
import { compose, map, prop } from "ramda";

import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import { renderSortedDialogs } from "./tools";
import { OrderSort, sortByDate } from "libs/sorters";
import { ChatInterface } from "types/types";
import { fakeData } from "./fakeData";

const DialogItemsWrapper: FC<any> = () => {
  const [selectedDialogId, setSelectedDialogId] = useState<string>(null);

  console.log(
    "sorting => ",

    compose(
      sortByDate<ChatInterface>({
        pathToCode: ["date"],
        order: OrderSort.DESC
      }),
      map(prop("lastMessage"))
    )(fakeData)
  );

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
