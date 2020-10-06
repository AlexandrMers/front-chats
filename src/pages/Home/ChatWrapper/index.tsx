import React, { FC, memo, useCallback } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";

import MessageAudio from "components/Message/MessageAudio";
import Message from "components/Message";
import Wrapper from "primitives/Wrapper";
import ChatHeader from "./ChatHeader";

import { ChatInterface, UserInterface } from "types/types";

import InputMessage from "components/InputMessage";

interface ChatWrapperPropsInterface {
  chat: ChatInterface;
  currentUser: UserInterface;
}

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({ currentUser, chat }) => {
  const onActionDialog = useCallback(() => {
    console.log("click on action by dialog");
  }, []);

  return (
    <Wrapper
        className={styleModule.mainWrapper}
    >
      <ChatHeader onClick={onActionDialog} user={chat.user} />

      <ScrollBar
        style={{
          height: "100%",
          flex: "1 0 0"
        }}
        hideTracksWhenNotNeeded
      >
        <Wrapper className={classNames(styleModule.chatWrapper)}>
          <>
            {chat.messages.map((message) => {
              const isAudioMsg = !!message.audio;

              return (
                <Wrapper
                  className={styleModule.messageWrapper}
                  key={message.id}
                >
                  {isAudioMsg ? (
                    <MessageAudio
                      message={message}
                      isMe={currentUser.id === message.author.id}
                    />
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
        </Wrapper>
      </ScrollBar>

      <Wrapper className={styleModule.chatWrapper__inputWrapper}>
        <InputMessage placeholder={"Введите текст сообщения..."} />
      </Wrapper>
    </Wrapper>
  );
};

export default memo(ChatWrapper);
