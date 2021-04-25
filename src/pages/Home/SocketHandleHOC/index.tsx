import React, { FC, memo, useEffect } from "react";
import { shallowEqual } from "react-redux";
import io from "socket.io-client";

import { UserInterface } from "types/types";

import { useAppDispatch, useTypedSelector } from "state/store";

import { ChatEvent } from "./types";
import {
  setUserOfflineById,
  setUserOnlineById
} from "../../../state/modules/user/actions";

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
      currentUserInfo: state.userModule.userInfo
    }),
    shallowEqual
  );

  useEffect(() => {
    // socket.on(ChatEvent.NEW_MESSAGE, (msg: MessageInterface) => {
    //   console.log("new message event ! -> ", msg);
    // });

    // socket.on("user_leave", (msg: any) => {
    //   console.log("user leave ", msg);
    // });

    // socket.on("CHAT:CREATED", (chat: any) => {
    //   console.log("new chat -> ", chat);
    // });

    socket.on(ChatEvent.USER_ONLINE, (joinedUserData: UserInterface) => {
      if (!currentUserInfo || currentUserInfo?.id === joinedUserData?.id) {
        return;
      }

      dispatch(setUserOnlineById(joinedUserData));
    });

    socket.on(ChatEvent.USER_OFFLINE, (leftUser: UserInterface) => {
      if (!currentUserInfo || currentUserInfo?.id === leftUser?.id) {
        return;
      }

      dispatch(setUserOfflineById(leftUser));
    });

    return () => {
      socket.removeEventListener(ChatEvent.USER_ONLINE, () => {});
      socket.removeEventListener(ChatEvent.USER_OFFLINE, () => {});
    };
  }, [currentUserInfo]);

  useEffect(() => {
    if (!currentUserInfo) return undefined;

    socket.emit(ChatEvent.CONNECT_USER, currentUserInfo);
  }, [currentUserInfo]);

  return <Component {...otherProps} />;
};

export default memo(SocketHOC);
