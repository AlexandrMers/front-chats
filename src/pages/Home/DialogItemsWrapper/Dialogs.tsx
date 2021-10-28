import React, { memo, ReactNode } from "react";
import { shallowEqual } from "react-redux";
import { compose, map } from "ramda";
import { Empty } from "antd";

import { useTypedSelector } from "state/store";

import { ChatInterface } from "types/types";

import DialogItem from "components/DialogItem";

import Wrapper from "primitives/Wrapper";

import { OrderSort, sortByDate } from "libs/sorters";

import styleModule from "./style.module.scss";

function Dialogs({
  dialogItems,
  unreadCountMessages,
  selectedDialogId,
  setSelectedDialogId
}: {
  dialogItems: ChatInterface[];
  unreadCountMessages: { [key: string]: number };
  selectedDialogId: string;
  setSelectedDialogId: (value: string) => void;
}) {
  const { currentUser } = useTypedSelector(
    (state) => ({
      currentUser: state.userModule.userInfo
    }),
    shallowEqual
  );

  return (
    <>
      {dialogItems.length > 0 ? (
        compose(
          map<ChatInterface, ReactNode>((dialog) => {
            const isSelected = selectedDialogId === dialog.id;

            const countUnreadMessages = unreadCountMessages[dialog.id];

            return (
              <Wrapper key={dialog.id} className={styleModule.marginFromScroll}>
                <DialogItem
                  onSelect={setSelectedDialogId}
                  chat={dialog}
                  isSelected={isSelected}
                  currentUser={currentUser}
                  countUnreadMessages={countUnreadMessages}
                />
              </Wrapper>
            );
          }),
          sortByDate<ChatInterface>({
            pathToCode: ["lastMessage", "date"],
            order: OrderSort.DESC
          })
        )(dialogItems)
      ) : (
        <Empty description="Поиск не дал результатов" />
      )}
    </>
  );
}

export default Dialogs;
