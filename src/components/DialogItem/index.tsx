import React, { FC, memo, useMemo } from "react";
import { Typography } from "antd";
import { ru } from "date-fns/locale";
import formatRelative from "date-fns/format";
import classNames from "classnames";

import styleModule from "./style.module.scss";

import Avatar from "primitives/Avatar";
import DialogLastMessage from "./DialogLastMessage";

import { ChatInterface, UserInterface } from "../../types/types";

interface DialogItemPropsInterface {
  chat: ChatInterface;
  onSelect: (dialogId: string) => void;
  isSelected?: boolean;
  isOnline?: boolean;
  currentUser?: UserInterface;
}

const DialogItem: FC<DialogItemPropsInterface> = ({
  isSelected,
  isOnline,
  chat,
  onSelect,
  currentUser
}) => {
  const date = useMemo(
    () =>
      formatRelative(new Date(chat.lastMessage.createdAt), "HH:mm:ss", {
        weekStartsOn: 1,
        locale: ru
      }),
    [chat]
  );

  return (
    <div
      className={classNames(styleModule.dialogItem, {
        [styleModule.dialogItem_isSelected]: isSelected
      })}
      onClick={() => onSelect(chat.id)}
    >
      <Avatar
        size={40}
        //TODO - аватарок еще нет
        avatar={null}
        name={chat.partner.fullName}
        className={classNames(styleModule.dialogItem__avatar, {
          [styleModule.dialogItem__avatar_isOnline]: isOnline
        })}
      />
      <div className={styleModule.dialogItem__content}>
        <header className={styleModule.dialogItem__header}>
          <Typography.Title
            ellipsis
            className={styleModule.dialogItem__title}
            level={5}
          >
            {chat.additionalInfo.name}
          </Typography.Title>
          <time className={styleModule.dialogItem__date}>{date}</time>
        </header>
        <DialogLastMessage
          lastMessage={chat.lastMessage}
          unreadCount={0}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default memo(DialogItem);
