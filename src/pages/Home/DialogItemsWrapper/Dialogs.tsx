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
  selectedDialogId,
  setSelectedDialogId,
  dialogItems
}: {
  selectedDialogId: string;
  setSelectedDialogId: (value: string) => void;
  dialogItems: ChatInterface[];
}) {
  const { currentUser } = useTypedSelector(
    (state) => ({
      currentUser: state.userModule.userInfo
    }),
    shallowEqual
  );

  return dialogItems.length > 0 ? (
    compose(
      map<ChatInterface, ReactNode>((dialog) => {
        const isSelected = selectedDialogId === dialog.id;

        return (
          <Wrapper key={dialog.id} className={styleModule.marginFromScroll}>
            <DialogItem
              onSelect={setSelectedDialogId}
              chat={dialog}
              isSelected={isSelected}
              currentUser={currentUser}
              isOnline={dialog?.additionalInfo.isOnline}
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
  );
}

export default memo(Dialogs as any);
