import React, { FC, memo, useEffect } from "react";
import io from "socket.io-client";
import { useTypedSelector } from "../../../state/store";
import { shallowEqual } from "react-redux";

const socket = io("http://localhost:8080");

const SocketHOC = ({
  component: Component,
  ...otherProps
}: {
  component: FC;
}) => {
  const { currentUserInfo } = useTypedSelector(
    (state) => ({
      currentUserInfo: state.userModule.userInfo
    }),
    shallowEqual
  );

  console.log("currentUserInfo -> ", currentUserInfo);

  useEffect(() => {
    socket.on("NEW_MESSAGE", (msg: any) => {
      console.log("new message -> ", msg);
    });

    socket.on("CHAT:CREATED", (chat: any) => {
      console.log("new chat -> ", chat);
    });

    return () => {
      socket.removeEventListener("NEW_MESSAGE", (msg: any) => {
        console.log("new message -> ", msg);
      });
    };
  }, []);

  useEffect(() => {
    if (!currentUserInfo) return undefined;

    socket.emit("connectUser", currentUserInfo);
  }, [currentUserInfo]);

  return <Component {...otherProps} />;
};

export default memo(SocketHOC);
