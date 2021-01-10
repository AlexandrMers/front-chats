import React, { FC, memo, useEffect } from "react";
import { Empty } from "antd";

import { WechatOutlined } from "@ant-design/icons";

import Loader from "primitives/Loader";
import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

import FlexContainer from "../../primitives/FlexContainer";

import { useAppDispatch, useTypedSelector } from "../../state/store";
import { getCurrentUser } from "../../state/modules/user";
import { shallowEqual } from "react-redux";
import { ChatInterface } from "../../types/types";
import { getChats } from "../../state/modules/chats";

const Home: FC = () => {
  const chatLoading = false;
  const selectedChat: ChatInterface = null;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getChats());
    // eslint-disable-next-line
  }, []);

  const {
    isLoadingUser,
    currentUser,
    isLoadingChats,
    chats
  } = useTypedSelector(
    (state) => ({
      isLoadingUser: state.userModule.loading,
      currentUser: state.userModule.userInfo,
      isLoadingChats: state.chatModule.chatsLoading,
      chats: state.chatModule.chats
    }),
    shallowEqual
  );

  console.log("currentUser -> ", currentUser);

  if (isLoadingUser || isLoadingChats) {
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
      <DialogItemsWrapper
        chats={chats}
        onSelectChat={(selectedChatId) =>
          console.log("selectedChatId -> ", selectedChatId)
        }
      />
      <>
        {chatLoading ? (
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
        ) : selectedChat ? (
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
