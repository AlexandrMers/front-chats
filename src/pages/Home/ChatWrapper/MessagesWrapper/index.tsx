import React, { memo } from "react";

import {
  PartnerInfoChatInterface,
  MessageInterface,
  MessageType,
  UserInterface
} from "types/types";

import MessageAudio from "components/Message/MessageAudio";
import SystemMessage from "components/Message/SystemMessage";
import Message from "components/Message";

import Wrapper from "primitives/Wrapper";

import styleModule from "../style.module.scss";
import { useTypedSelector } from "../../../../state/store";

function MessagesWrapper({
  isLoadedMessagesWrapper,
  currentUser,
  messages = [],
  partnerInfo
}: {
  isLoadedMessagesWrapper: boolean;
  currentUser: UserInterface;
  messages: MessageInterface[];
  partnerInfo: PartnerInfoChatInterface;
}) {
  return (
    isLoadedMessagesWrapper && (
      <>
        {messages.map((message) => {
          const isMe = currentUser.id === message.author.id;

          return (
            <Wrapper className={styleModule.messageWrapper} key={message.id}>
              {message.type === MessageType.SYSTEM ? (
                <SystemMessage type={MessageType.SYSTEM} {...message} />
              ) : (
                <Message
                  message={message}
                  isMe={isMe}
                  avatar={isMe ? currentUser.avatar : partnerInfo.avatar}
                />
              )}
            </Wrapper>
          );
        })}
      </>
    )
  );
}

export default memo(MessagesWrapper);
