import React, {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

// Types
import {
  ChatInterface,
  DataForSendMessageInterface,
  MessageInterface,
  UserInterface
} from "types/types";
import { UploadFile } from "antd/lib/upload/interface";
import { FileInterface } from "state/modules/selectedChat/types";

// State
import { useAppDispatch, useTypedSelector } from "state/store";
import { isHasMoreSelectedChatMessagesSelector } from "../selectors";

// Hooks
import { useChatScrollManager, useScrollObserver } from "hooks/hooks";

// Container
import InputMessageContainer from "components/InputMessage/container";

// Components
import ChatHeader from "./ChatHeader";
import MessagesWrapper from "./MessagesWrapper";

// Primitives
import Wrapper from "primitives/Wrapper";

// Styles
import styleModule from "./style.module.scss";
import { SocketContext } from "../../../App";
import { ChatEvent } from "../../../hocs/SocketHandleHOC/types";
import { clearUnreadCountMessages } from "../../../state/modules/chats/actions";

const POSITION_SCROLL_TOP_FOR_REQUEST_MESSAGE = 50;

interface ChatWrapperPropsInterface {
  currentUser: UserInterface;
  chat: ChatInterface;
  messages: MessageInterface[];
  onSendMessage: (message: DataForSendMessageInterface) => void;
  getMessagesByChatIdHandler: ({
    selectedChatId,
    page
  }: {
    selectedChatId: string;
    page: number;
  }) => void;
}

const ChatWrapper: FC<ChatWrapperPropsInterface> = ({
  currentUser,
  chat,
  messages,
  onSendMessage: onSendMessageProp,
  getMessagesByChatIdHandler
}) => {
  const { isHasMoreMessagesSelectedChat } = useTypedSelector((state) => ({
    isHasMoreMessagesSelectedChat: isHasMoreSelectedChatMessagesSelector(state)
  }));
  const dispatch = useAppDispatch();

  const page = useRef(1);
  const refMessagesWrapper = useRef(null);
  const scrollRef = useRef(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!chat?.id) return undefined;
    dispatch(clearUnreadCountMessages(chat?.id));
  }, [dispatch, chat]);

  useEffect(() => {
    if (!socket || !messages || !currentUser) return undefined;
    const unreadMessagesFromPartner = messages.filter(
      (msg) => msg.author.id !== currentUser.id && !msg.isRead
    );
    if (unreadMessagesFromPartner.length) {
      socket.emit(ChatEvent.READ_MESSAGE, {
        chatId: unreadMessagesFromPartner[0].chatId,
        userId: unreadMessagesFromPartner[0].author.id
      });
    }
  }, [socket, messages, currentUser]);

  const [isLoadedMessagesWrapper, setIsLoadedMessagesWrapper] = useState(false);

  const { scrollToBottom } = useChatScrollManager({
    observableElement: refMessagesWrapper,
    scroll: scrollRef,
    observerConfig: {
      childList: true,
      subtree: false,
      attributes: false
    },
    callback: (isLoaded) => {
      setIsLoadedMessagesWrapper(isLoaded);
    }
  });
  useScrollObserver(
    {
      debounceDelay: 500,
      scroll: scrollRef,
      callback: ({ target }) => {
        if (
          isHasMoreMessagesSelectedChat &&
          target.scrollTop < POSITION_SCROLL_TOP_FOR_REQUEST_MESSAGE
        ) {
          page.current = page.current + 1;
          getMessagesByChatIdHandler({
            selectedChatId: chat.id,
            page: page.current
          });
        }
      }
    },
    [isHasMoreMessagesSelectedChat]
  );

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
