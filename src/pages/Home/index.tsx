import React, { memo } from "react";

import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

const Home = () => {
  return (
    <Wrapper
      styles={{
        display: "flex",
        width: "100%",
        maxWidth: 1143,
        padding: 35,
        margin: "auto",
      }}
    >
      <DialogItemsWrapper />
      <ChatWrapper />
    </Wrapper>
  );
};

export default memo(Home);
