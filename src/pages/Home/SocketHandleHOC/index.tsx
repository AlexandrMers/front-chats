import React, { FC, memo, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const SocketHOC = ({
  component: Component,
  ...otherProps
}: {
  component: FC;
}) => {
  useEffect(() => {
    socket.emit("msgFromClient", "123");

    socket.on("NEW_MESSAGE", (msg: any) => {
      console.log("new message -> ", msg);
    });
  }, []);

  return <Component {...otherProps} />;
};

export default memo(SocketHOC);
