import React, { FC, memo, useEffect } from "react";
import { shallowEqual } from "react-redux";
import io from "socket.io-client";

import { useAppDispatch, useTypedSelector } from "state/store";
import {
  setUserOfflineById,
  setUserOnlineById
} from "state/modules/user/actions";

import { UserInterface } from "types/types";

import { ChatEvent } from "./types";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const SocketHOC = ({
  component: Component,
  ...otherProps
}: {
  component: FC;
}) => {
  const dispatch = useAppDispatch();

  const { currentUserInfo } = useTypedSelector(
    (state) => ({
      currentUserInfo: state?.userModule?.userInfo
    }),
    shallowEqual
  );

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
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

    return () => {
      socket.removeAllListeners();
    };
  }, [currentUserInfo, dispatch]);

  useEffect(() => {
    if (!currentUserInfo) return undefined;

    socket.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo]);

  return <Component {...otherProps} />;
};

export default memo(SocketHOC);
