import React, { ReactElement } from "react";
import { compose, map } from "ramda";
import { Empty } from "antd";

import styleModule from "./style.module.scss";

import { ChatInterface } from "types/types";
import Wrapper from "primitives/Wrapper";
import DialogItem from "components/DialogItem";

import { OrderSort, sortByDate } from "libs/sorters";

export function renderSortedDialogs({
  selectedDialogId,
  setSelectedDialogId,
  dialogItems
}: {
  selectedDialogId: string;
  setSelectedDialogId: (value: string) => void;
  dialogItems: ChatInterface[];
}) {
  return dialogItems.length > 0 ? (
    compose(
      map<ChatInterface, ReactElement>((dialog) => {
        const isSelected = selectedDialogId === dialog.id;
        return (
          <Wrapper key={dialog.id} className={styleModule.marginFromScroll}>
            <DialogItem
              onSelect={setSelectedDialogId}
              chat={dialog}
              isSelected={isSelected}
              isOnline={dialog.unreadCount > 0}
              currentUser={{
                id: "1",
                name: "Александр Авдеев",
                avatar: null
              }}
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
