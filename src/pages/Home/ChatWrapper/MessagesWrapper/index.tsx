import React, { memo } from "react";

import { MessageInterface, MessageType, UserInterface } from "types/types";

import MessageAudio from "components/Message/MessageAudio";
import SystemMessage from "components/Message/SystemMessage";
import Message from "components/Message";

import Wrapper from "primitives/Wrapper";

import styleModule from "../style.module.scss";

function MessagesWrapper({
  isLoadedMessagesWrapper,
  currentUser,
  messages = []
}: {
  isLoadedMessagesWrapper: boolean;
  currentUser: UserInterface;
  messages: MessageInterface[];
}) {
  return (
    isLoadedMessagesWrapper && (
      <>
        {messages.map((message) => {
          //TODO - функционал аудио-сообщений не реализован на бекенде.
          // const isAudioMsg = !!message?.audio;
          const isAudioMsg = false;

          return (
            <Wrapper className={styleModule.messageWrapper} key={message.id}>
              {isAudioMsg ? (
                <MessageAudio
                  message={message}
                  isMe={currentUser.id === message.author.id}
                />
              ) : message.type === MessageType.SYSTEM ? (
                <SystemMessage type={MessageType.SYSTEM} {...message} />
              ) : (
                <Message
                  message={message}
                  isMe={currentUser.id === message.author.id}
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
