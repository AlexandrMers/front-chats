import React, { FC, memo, useMemo } from "react";
import { Typography } from "antd";
import { ru } from "date-fns/locale";
import { last } from "ramda";

import styleModule from "./style.module.scss";

import Avatar from "primitives/Avatar";
import classNames from "classnames";
import { ChatInterface, UserInterface } from "../../types/types";
import formatRelative from "date-fns/format";
import DialogLastMessage from "./DialogLastMessage";

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
  const { messages, unreadCount, user } = chat;

  const extractedLastMessage = useMemo(() => last(messages), [messages]);

  const date = useMemo(
    () =>
      formatRelative(new Date(extractedLastMessage.date), "HH:mm:ss", {
        weekStartsOn: 1,
        locale: ru
      }),
    [extractedLastMessage.date]
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
        avatar={user.avatar}
        name={user.fullName}
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
            {user.fullName}
          </Typography.Title>
          <time className={styleModule.dialogItem__date}>{date}</time>
        </header>
        <DialogLastMessage
          lastMessage={extractedLastMessage}
          unreadCount={unreadCount}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default memo(DialogItem);
