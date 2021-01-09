import React, {
  Component,
  memo,
  ReactComponentElement,
  ReactElement,
  ReactNode
} from "react";
import { compose, map } from "ramda";
import { Empty } from "antd";
import { shallowEqual } from "react-redux";

import styleModule from "./style.module.scss";

import { ChatInterface } from "types/types";
import Wrapper from "primitives/Wrapper";
import DialogItem from "components/DialogItem";

import { OrderSort, sortByDate } from "libs/sorters";

import { useTypedSelector } from "../../../state/store";

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
      currentUser: state.user.userInfo
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
