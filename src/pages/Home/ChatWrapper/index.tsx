import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

// Types
import { ScrollbarsOverrideType } from "types/helpersType";
import {
  ChatInterface,
  DataForSendMessageInterface,
  MessageInterface,
  MessageType,
  UserInterface
} from "types/types";
import { UploadFile } from "antd/lib/upload/interface";
import { FileInterface } from "state/modules/selectedChat/types";

// Hooks
import { useChatScrollManager } from "hooks/hooks";

// Container
import InputMessageContainer from "components/InputMessage/container";

// Components
import MessageAudio from "components/Message/MessageAudio";
import Message from "components/Message";
import SystemMessage from "components/Message/SystemMessage";
import ChatHeader from "./ChatHeader";

// Primitives
import Wrapper from "primitives/Wrapper";

// Styles
import styleModule from "./style.module.scss";

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

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({
  currentUser,
  chat,
  messages,
  onSendMessage: onSendMessageProp
}) => {
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

  useEffect(() => {
    scrollToBottom("auto");
  }, [scrollToBottom]);

  const onSendMessage = useCallback(
    (msgText: string, fileList) => {
      scrollToBottom();
      onSendMessageProp({
        text: msgText,
        chatId: chat.id,
        author: {
          fullName: currentUser.fullName,
          id: currentUser.id
        },
        attachments: fileList.map((file: UploadFile & FileInterface) => file.id)
      });
    },
    // eslint-disable-next-line
    [currentUser, scrollToBottom, onSendMessageProp, chat]
  );

  return (
    <Wrapper className={styleModule.mainWrapper}>
      <ChatHeader info={chat?.additionalInfo} />
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
        <InputMessageContainer
          placeholder="Введите текст сообщения..."
          sendMessage={onSendMessage}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default memo(ChatWrapper);
