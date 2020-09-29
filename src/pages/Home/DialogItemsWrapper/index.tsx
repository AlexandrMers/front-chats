import React, { FC, memo, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import DialogItem from "components/DialogItem";
import {currentUser, fakeData} from "./fakeData";

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
        <>
          {fakeData.map((dialog) => {
            const isSelected = selectedDialogId === dialog.chatId;
            return (
              <Wrapper
                key={dialog.chatId}
                className={styleModule.marginFromScroll}
              >
                <DialogItem
                  onSelect={setSelectedDialogId}
                  chat={dialog}
                  isSelected={isSelected}
                  isOnline={dialog.unreadCount > 0}
                  currentUser={currentUser}
                />
              </Wrapper>
            );
          })}
        </>
      </ScrollBar>
    </Wrapper>
  );
};

export default memo(DialogItemsWrapper);
