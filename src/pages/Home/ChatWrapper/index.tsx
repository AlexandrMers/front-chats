import React, { FC, memo, useCallback, useRef, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import { ScrollbarsOverrideType } from "types/helpersType";

import styleModule from "./style.module.scss";

import { useChatScrollManager } from "hooks/hooks";

import MessageAudio from "components/Message/MessageAudio";
import Message from "components/Message";
import InputMessage from "components/InputMessage";

import Wrapper from "primitives/Wrapper";
import ChatHeader from "./ChatHeader";

import {
  ChatInterface,
  DataForSendMessageInterface,
  MessageInterface,
  UserInterface
} from "types/types";

interface ChatWrapperPropsInterface {
  currentUser: UserInterface;
  chat: ChatInterface;
  messages: MessageInterface[];
  onSendMessage: (message: DataForSendMessageInterface) => void;
}

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

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({
  currentUser,
  chat,
  messages,
  onSendMessage: onSendMessageProp
}) => {
  const onActionDialog = useCallback(() => {
    console.log("click on action by dialog");
  }, []);

  const scrollRef = useRef<ScrollbarsOverrideType>(null);
  const refMessagesWrapper = useRef(null);

  const [isLoadedMessagesWrapper, setIsLoadedMessagesWrapper] = useState(false);

  const { scrollToBottom } = useChatScrollManager({
    observableElement: refMessagesWrapper,
    scrollRef,
    observerConfig: {
      childList: true,
      subtree: false,
      attributes: false
    },
    callback: (isLoaded) => {
      setIsLoadedMessagesWrapper(isLoaded);
    }
  });

  const onSendMessage = useCallback(
    (msgText: string) => {
      scrollToBottom();
      onSendMessageProp({
        text: msgText,
        chatId: chat.id,
        author: {
          fullName: currentUser.fullName,
          id: currentUser.id
        }
      });
    },
    // eslint-disable-next-line
    [currentUser, scrollToBottom, onSendMessageProp, chat]
  );

  return (
    <Wrapper className={styleModule.mainWrapper}>
      <ChatHeader onClick={onActionDialog} name={chat?.name} />

      <ScrollBar
        style={{
          height: "100%",
          flex: "1 0 0"
        }}
        hideTracksWhenNotNeeded
        ref={scrollRef}
      >
        <Wrapper
          appendProps={{
            ref: refMessagesWrapper
          }}
          className={classNames(styleModule.chatWrapper)}
        >
          <MessagesWrapper
            currentUser={currentUser}
            isLoadedMessagesWrapper={isLoadedMessagesWrapper}
            messages={messages}
          />
        </Wrapper>
      </ScrollBar>

      <Wrapper className={styleModule.chatWrapper__inputWrapper}>
        <InputMessage
          placeholder="Введите текст сообщения..."
          sendMessage={onSendMessage}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default memo(ChatWrapper);
