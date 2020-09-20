import React, { FC, memo } from "react";
import { Typography } from "antd";

import styleModule from "./style.module.scss";

import Avatar from "primitives/Avatar";
import classNames from "classnames";
import BadgeCounter from "primitives/BadgeCounter";
import { MessageInterface } from "../Message/types";

interface UserInterface {
  name: string;
  avatar: string;
  id: string;
}

interface ChatInterface {
  user: UserInterface;
  lastMessage: MessageInterface;
  unreadCount: number;
}

interface DialogItemPropsInterface {
  isSelected?: boolean;
  isOnline?: boolean;
  chat: ChatInterface;
}

const DialogItem: FC<DialogItemPropsInterface> = ({
  isSelected,
  isOnline,
  chat,
}) => {
  const { lastMessage, unreadCount, user } = chat;

  return (
    <div
      className={classNames(styleModule.dialogItem, {
        [styleModule.dialogItem_isSelected]: isSelected,
      })}
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
          <time className={styleModule.dialogItem__date}>Сейчас</time>
        </header>

        <section className={styleModule.dialogItem__msgInfo}>
          <Typography.Paragraph
            ellipsis
            className={styleModule.dialogItem__messageText}
          >
            {lastMessage.text}
          </Typography.Paragraph>
          <BadgeCounter value={unreadCount} />
        </section>
      </div>
    </div>
  );
};

export default memo(DialogItem);
