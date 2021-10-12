import React, { FC, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import io, { Socket } from "socket.io-client";

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
  updateLastMessage
} from "../../state/modules/selectedChat/actions";

export type SocketHocTypeComponent<T = {}> = T & {
  emitEventToSocket: (event: typeof ChatEvent, payload: any) => void;
};

function SocketHOC({
  component: Component,
  ...otherProps
}: {
  component: FC<any>;
  [key: string]: any;
}) {
  const socket =
    useRef<
      typeof Socket & {
        emit(
          event: string | typeof ChatEvent,
          ...args: any[]
        ): typeof io.Socket;
      }
    >(null);

  const dispatch = useAppDispatch();

  const { currentUserInfo } = useTypedSelector(
    (state) => ({
      currentUserInfo: state?.userModule?.userInfo
    }),
    shallowEqual
  );

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.connect();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.on(
      ChatEvent.USER_ONLINE,
      (joinedUserData: UserInterface) => {
        if (currentUserInfo && currentUserInfo?.id !== joinedUserData?.id) {
          dispatch(setUserOnlineById(joinedUserData));
        }
      }
    );

    socket.current.on(ChatEvent.USER_OFFLINE, (leftUser: UserInterface) => {
      if (currentUserInfo && currentUserInfo?.id !== leftUser?.id) {
        dispatch(setUserOfflineById(leftUser));
      }
    });

    socket.current.on(ChatEvent.CREATED_CHAT, (createdChat: ChatInterface) => {
      dispatch(addNewChat(createdChat));
    });

    socket.current.on(ChatEvent.NEW_MESSAGE, (newMessage: MessageInterface) => {
      dispatch(updateLastMessage(newMessage));
      if (currentUserInfo.id === newMessage.author.id) return;
      dispatch(addNewMessage(newMessage));
    });

    return () => {
      socket.current.removeAllListeners();
    };
  }, [currentUserInfo, dispatch]);

  useEffect(() => {
    if (!currentUserInfo) return undefined;

    socket.current.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo]);

  const emitEventToSocket = (event: typeof ChatEvent, payload: any) => {
    socket.current.emit(event, payload);
  };

  return <Component {...otherProps} emitEventToSocket={emitEventToSocket} />;
}

export default SocketHOC;
