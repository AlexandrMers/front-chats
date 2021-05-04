import React, { FC, memo, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import io from "socket.io-client";

import { useAppDispatch, useTypedSelector } from "state/store";
import {
  setUserOfflineById,
  setUserOnlineById
} from "state/modules/user/actions";

import { ChatInterface, UserInterface } from "types/types";

import { ChatEvent } from "./types";

const SocketHOC = ({
  component: Component,
  ...otherProps
}: {
  component: FC;
}) => {
  const socket = useRef(null);

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
      console.log("created chat -> ", createdChat);
    });

    return () => {
      socket.current.removeAllListeners();
    };
  }, [currentUserInfo, dispatch]);

  useEffect(() => {
    if (!currentUserInfo) return undefined;

    socket.current.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo]);

  return <Component {...otherProps} />;
};

export default memo(SocketHOC);
