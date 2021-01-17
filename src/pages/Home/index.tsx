import React, { FC, memo, useCallback, useEffect } from "react";
import { Empty } from "antd";
import { shallowEqual } from "react-redux";

import { WechatOutlined } from "@ant-design/icons";

import Loader from "primitives/Loader";
import FlexContainer from "primitives/FlexContainer";
import Wrapper from "primitives/Wrapper";

import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

import { useAppDispatch, useTypedSelector } from "state/store";
import { getCurrentUser } from "state/modules/user";
import { getChats } from "state/modules/chats/actions";
import {
  getMessagesByChatId,
  selectChatId,
  sendMessage
} from "state/modules/selectedChat/actions";

import { selectChatInfo } from "./selectors";
import { DataForSendMessageInterface } from "../../types/types";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getChats());
  }, [dispatch]);

  const {
    isLoadingUser,
    currentUser,
    isLoadingChats,
    chats,
    selectedChatId,
    selectedChatLoading,
    selectedChatMessages,
    selectedChatInfo
  } = useTypedSelector((state) => {
    return {
      isLoadingUser: state.userModule.loading,
      currentUser: state.userModule.userInfo,
      isLoadingChats: state.chatModule.chatsLoading,
      chats: state.chatModule.chats,
      selectedChatId: state.selectedChatModule.selectedChatId,
      selectedChatLoading: state.selectedChatModule.selectedChatLoading,
      selectedChatMessages: state.selectedChatModule.selectedChatMessages,
      selectedChatInfo: selectChatInfo(state)
    };
  }, shallowEqual);

  const onSelectChat = useCallback(
    (selectedChatId: string) => {
      dispatch(selectChatId(selectedChatId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!selectedChatId) return undefined;
    dispatch(getMessagesByChatId(selectedChatId));
  }, [dispatch, selectedChatId]);

  const onSendMessage = useCallback(
    (msgData: DataForSendMessageInterface) => {
      dispatch(sendMessage(msgData));
    },
    [dispatch]
  );

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
      <DialogItemsWrapper chats={chats} onSelectChat={onSelectChat} />
      <>
        {selectedChatLoading ? (
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
        ) : selectedChatMessages && selectedChatId ? (
          <ChatWrapper
            messages={selectedChatMessages}
            key={selectedChatId}
            chat={selectedChatInfo}
            currentUser={currentUser}
            onSendMessage={onSendMessage}
          />
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
