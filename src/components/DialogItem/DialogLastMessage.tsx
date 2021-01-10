import React, { memo } from "react";
import { Typography } from "antd";

import { MessageInterface, UserInterface } from "types/types";
import styleModule from "./style.module.scss";

import BadgeCounter from "primitives/BadgeCounter";
import Wrapper from "primitives/Wrapper";

function renderLastMessage(
  lastMessage: MessageInterface,
  currentUser: UserInterface
) {
  if (lastMessage?.attachments?.length > 0) {
    return (
      <Typography.Paragraph
        style={{
          fontWeight: "bold",
          fontSize: "13px",
          opacity: 0.9
        }}
      >
        Прикреплен файл
      </Typography.Paragraph>
    );
  }
  if (!!lastMessage.audio) {
    return (
      <Typography.Paragraph
        style={{
          fontWeight: "bold",
          fontSize: "13px",
          opacity: 0.9
        }}
      >
        Голосовое сообщение
      </Typography.Paragraph>
    );
  }
  if (lastMessage.author.id === currentUser.id) {
    return (
      <Wrapper
        styles={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography.Paragraph
          style={{
            fontWeight: "bold"
          }}
        >
          Вы:
        </Typography.Paragraph>
        &nbsp;
        <Typography.Paragraph>{lastMessage.text}</Typography.Paragraph>
      </Wrapper>
    );
  }

  return (
    <Typography.Paragraph ellipsis>{lastMessage.text}</Typography.Paragraph>
  );
}

const DialogLastMessage = ({
  lastMessage,
  currentUser,
  unreadCount
}: {
  lastMessage: MessageInterface;
  unreadCount: number;
  currentUser: UserInterface;
}) => {
  return (
    <section className={styleModule.dialogItem__msgInfo}>
      <Typography.Paragraph
        ellipsis
        className={styleModule.dialogItem__messageText}
      >
        {renderLastMessage(lastMessage, currentUser)}
      </Typography.Paragraph>
      {unreadCount > 0 && <BadgeCounter value={unreadCount} />}
    </section>
  );
};

export default memo(DialogLastMessage);
