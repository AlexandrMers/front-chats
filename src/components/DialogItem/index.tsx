import React, { FC, memo, useMemo } from "react";
import formatRelative from "date-fns/format";
import { ru } from "date-fns/locale";
import classNames from "classnames";
import { Avatar, Badge, Typography } from "antd";

import styleModule from "./style.module.scss";

import DialogLastMessage from "./DialogLastMessage";

import { ChatInterface, UserInterface } from "../../types/types";
import { shortName } from "../../primitives/Avatar/helpers";

interface DialogItemPropsInterface {
  chat: ChatInterface;
  isSelected?: boolean;
  currentUser?: UserInterface;
  countUnreadMessages: number;
  onSelect: (dialogId: string) => void;
}

const DialogItem: FC<DialogItemPropsInterface> = ({
  isSelected,
  chat,
  currentUser,
  countUnreadMessages,
  onSelect
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
      <Badge
        size="small"
        count={countUnreadMessages > 100 ? "99+" : countUnreadMessages}
        style={{
          zIndex: 100
        }}
      >
        <Avatar
          alt="123"
          size="large"
          shape="circle"
          style={{
            zIndex: 100
          }}
          src={chat.partnerInfo.avatar}
          className={classNames(styleModule.dialogItem__avatar, {
            [styleModule.dialogItem__avatar_isOnline]: chat.partnerInfo.isOnline
          })}
        >
          {shortName(chat.partner.fullName)}
        </Avatar>
      </Badge>

      <div className={styleModule.dialogItem__content}>
        <header className={styleModule.dialogItem__header}>
          <Typography.Title
            ellipsis
            className={styleModule.dialogItem__title}
            level={5}
          >
            {chat.partnerInfo.name}
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
