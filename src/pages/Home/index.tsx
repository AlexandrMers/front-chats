import React, { memo } from "react";

import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

const Home = () => (
  <Wrapper className={styleModule.homeWrapper}>
    <DialogItemsWrapper />
    <ChatWrapper />
  </Wrapper>
);

export default memo(Home);
