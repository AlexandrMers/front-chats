import React, { FC, useContext, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useTypedSelector } from "state/store";
import { addNewChat } from "state/modules/chats/actions";

import {
  setUserOfflineById,
  setUserOnlineById
} from "state/modules/user/actions";

import { ChatInterface, MessageInterface, UserInterface } from "types/types";

import { ChatEvent } from "./types";
import {
  addNewMessage,
  readMessages,
  updateCountersMessages,
  updateLastMessage
} from "../../state/modules/selectedChat/actions";
import { SocketContext } from "../../App";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import messageSound from "../../audio/icq.mp3";

function SocketHOC({
  component: Component,
  ...otherProps
}: {
  component: FC<any>;
  [key: string]: any;
}) {
  const dispatch = useAppDispatch();

  const { currentUserInfo, selectedChatId } = useTypedSelector(
    (state) => ({
      currentUserInfo: state?.userModule?.userInfo,
      selectedChatId: state?.selectedChatModule?.selectedChatId
    }),
    shallowEqual
  );

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return undefined;
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on(ChatEvent.USER_ONLINE, (joinedUserData: UserInterface) => {
      if (currentUserInfo && currentUserInfo?.id !== joinedUserData?.id) {
        dispatch(setUserOnlineById(joinedUserData));
      }
    });

    socket.on(ChatEvent.USER_OFFLINE, (leftUser: UserInterface) => {
      if (currentUserInfo && currentUserInfo?.id !== leftUser?.id) {
        dispatch(setUserOfflineById(leftUser));
      }
    });

    socket.on(ChatEvent.CREATED_CHAT, (createdChat: ChatInterface) => {
      dispatch(addNewChat(createdChat));
    });

    socket.on(ChatEvent.NEW_MESSAGE, (newMessage: MessageInterface) => {
      dispatch(updateLastMessage(newMessage));
      if (currentUserInfo.id === newMessage.author.id) return;
      audioRef?.current?.play();
      dispatch(addNewMessage(newMessage));
      if (selectedChatId === newMessage.chatId) {
        return;
      }
      dispatch(updateCountersMessages(newMessage));
    });

    socket.on(
      ChatEvent.READ_MESSAGE,
      ({ chatId, userId }: { chatId: string; userId: string }) => {
        dispatch(readMessages({ chatId, userId }));
      }
    );

    return () => {
      socket.removeAllListeners();
    };
  }, [currentUserInfo, dispatch, socket, selectedChatId]);

  useEffect(() => {
    if (!currentUserInfo || !socket) return undefined;

    socket.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo, socket]);

  return (
    <>
      <audio
        ref={audioRef}
        src={messageSound}
        preload="metadata"
        style={{
          display: "none"
        }}
      />
      <Component {...otherProps} />
    </>
  );
}

export default SocketHOC;
