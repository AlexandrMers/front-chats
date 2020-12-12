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
import { ChatInterface, UserInterface } from "../../../types/types";

interface ChatWrapperPropsInterface {
  currentUser: UserInterface;
  chat: ChatInterface;
}

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({ currentUser, chat }) => {
  const onActionDialog = useCallback(() => {
    console.log("click on action by dialog");
  }, []);

  const scrollRef = useRef<ScrollbarsOverrideType>(null);
  const refMessagesWrapper = useRef(null);

  const [isLoadedMessagesWrapper, setIsLoadedMessagesWrapper] = useState(false);

  useChatScrollManager({
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

  return (
    <Wrapper className={styleModule.mainWrapper}>
      <ChatHeader onClick={onActionDialog} user={chat.user} />

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
          <>
            {isLoadedMessagesWrapper &&
              chat.messages.map((message) => {
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
        <InputMessage
          placeholder="Введите текст сообщения..."
          sendMessage={(msg) => {
            console.log("sent message => ", msg);
          }}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default memo(ChatWrapper);
