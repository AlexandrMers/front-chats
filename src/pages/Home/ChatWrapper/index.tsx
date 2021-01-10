import React, { FC, memo, useCallback, useRef, useState } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";

import MessageAudio from "components/Message/MessageAudio";
import Message from "components/Message";
import Wrapper from "primitives/Wrapper";
import ChatHeader from "./ChatHeader";

import InputMessage from "components/InputMessage";
import { useChatScrollManager } from "../../../hooks/hooks";
import { ScrollbarsOverrideType } from "../../../types/helpersType";
import {
  ChatInterface,
  MessageInterface,
  UserInterface
} from "../../../types/types";

interface ChatWrapperPropsInterface {
  currentUser: UserInterface;
  chat: ChatInterface;
}

function renderMessages(
  isLoadedMessagesWrapper: boolean,
  currentUser: UserInterface
) {
  const messages: MessageInterface[] = [];

  return (
    isLoadedMessagesWrapper &&
    messages.map((message) => {
      const isAudioMsg = !!message.audio;

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
    })
  );
}

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({ currentUser, chat }) => {
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
    },
    // eslint-disable-next-line
    [currentUser, scrollToBottom]
  );

  return (
    <Wrapper className={styleModule.mainWrapper}>
      <ChatHeader onClick={onActionDialog} user={chat?.author} />

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
          {renderMessages(isLoadedMessagesWrapper, currentUser)}
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
