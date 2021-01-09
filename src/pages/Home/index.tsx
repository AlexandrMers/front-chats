import React, { FC, memo } from "react";
import { Empty } from "antd";

import { WechatOutlined } from "@ant-design/icons";

import Loader from "primitives/Loader";
import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

import FlexContainer from "../../primitives/FlexContainer";

const Home: FC = () => {
  //TODO - логика fetching dialogs
  if (false) {
    return (
      <Wrapper
        styles={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Loader />
      </Wrapper>
    );
  }

  return (
    <FlexContainer className={styleModule.homeWrapper}>
      {!!true && <DialogItemsWrapper chats={[]} onSelectChat={null} />}
      <>
        {false ? (
          <Wrapper
            styles={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Loader />
          </Wrapper>
        ) : !!true ? (
          <ChatWrapper key={null} chat={null} currentUser={null} />
        ) : (
          <Wrapper className={styleModule.chatWrapper}>
            <Empty
              className={styleModule.chatWrapper__emptyWrap}
              imageStyle={{
                width: 48,
                height: 48,
                textAlign: "center"
              }}
              image={
                <WechatOutlined
                  style={{
                    fontSize: 48,
                    opacity: 0.3
                  }}
                />
              }
              description="Выберите диалог или создайте новый"
            />
          </Wrapper>
        )}
      </>
    </FlexContainer>
  );
};

export default memo(Home);
