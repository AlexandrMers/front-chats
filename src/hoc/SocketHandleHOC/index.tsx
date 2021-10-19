import React, { FC, useContext, useEffect } from "react";
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
  updateLastMessage
} from "../../state/modules/selectedChat/actions";
import { SocketContext } from "../../App";

function SocketHOC({
  component: Component,
  ...otherProps
}: {
  component: FC<any>;
  [key: string]: any;
}) {
  const dispatch = useAppDispatch();

  const { currentUserInfo } = useTypedSelector(
    (state) => ({
      currentUserInfo: state?.userModule?.userInfo
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
      dispatch(addNewMessage(newMessage));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [currentUserInfo, dispatch, socket]);

  useEffect(() => {
    if (!currentUserInfo || !socket) return undefined;

    socket.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo, socket]);

  return <Component {...otherProps} />;
}

export default SocketHOC;
