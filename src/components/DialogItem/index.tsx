import React, { FC, memo, useMemo } from "react";
import { Typography } from "antd";

import styleModule from "./style.module.scss";

import Avatar from "primitives/Avatar";
import classNames from "classnames";
import BadgeCounter from "primitives/BadgeCounter";
import { ChatInterface } from "../../types/types";
import formatRelative from "date-fns/format";
import { ru } from "date-fns/locale";

interface DialogItemPropsInterface {
  isSelected?: boolean;
  isOnline?: boolean;
  chat: ChatInterface;
  onSelect: (dialogId: string) => void;
}

const DialogItem: FC<DialogItemPropsInterface> = ({
  isSelected,
  isOnline,
  chat,
  onSelect,
}) => {
  const { lastMessage, unreadCount, user } = chat;

  const date = useMemo(
    () =>
      formatRelative(new Date(lastMessage.date), "HH:mm:ss", {
        weekStartsOn: 1,
        locale: ru,
      }),
    [lastMessage.date]
  );

  return (
    <div
      className={classNames(styleModule.dialogItem, {
        [styleModule.dialogItem_isSelected]: isSelected,
      })}
      onClick={() => onSelect(chat.chatId)}
    >
      <Avatar
        size={40}
        avatar={user.avatar}
        name={user.name}
        className={classNames(styleModule.dialogItem__avatar, {
          [styleModule.dialogItem__avatar_isOnline]: isOnline,
        })}
      />
      <div className={styleModule.dialogItem__content}>
        <header className={styleModule.dialogItem__header}>
          <Typography.Title
            ellipsis
            className={styleModule.dialogItem__title}
            level={5}
          >
            {user.name}
          </Typography.Title>
          <time className={styleModule.dialogItem__date}>{date}</time>
        </header>

        <section className={styleModule.dialogItem__msgInfo}>
          <Typography.Paragraph
            ellipsis
            className={styleModule.dialogItem__messageText}
          >
            {lastMessage.text}
          </Typography.Paragraph>
          {unreadCount > 0 && <BadgeCounter value={unreadCount} />}
        </section>
      </div>
    </div>
  );
};

export default memo(DialogItem);
