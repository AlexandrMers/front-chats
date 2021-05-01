import React, { memo, useCallback, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { Empty } from "antd";
import { LogoutOutlined, WechatOutlined } from "@ant-design/icons";

import Loader from "primitives/Loader";
import FlexContainer from "primitives/FlexContainer";
import Wrapper from "primitives/Wrapper";
import Button from "../../primitives/Button";

import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

import { useAppDispatch, useTypedSelector } from "state/store";
import { getAllUsers, getCurrentUser } from "state/modules/user/actions";
import { getChats } from "state/modules/chats/actions";
import {
  getMessagesByChatId,
  selectChatId,
  sendMessage
} from "state/modules/selectedChat/actions";
import { logout } from "../../state/modules/auth";

import { selectChatInfo, selectChatsSelector } from "./selectors";

import { DataForSendMessageInterface } from "types/types";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllUsers());
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
      chats: selectChatsSelector(state),
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

  const onLogout = () => {
    dispatch(logout());
  };

  if (isLoadingUser || isLoadingChats) {
    return (
      <Wrapper className={styleModule.loaderWrapper}>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <>
      <div className={styleModule.homeHeaderWrapper}>
        <Button
          className={styleModule.homeHeaderWrapper__LogoutButton}
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Выйти
        </Button>
      </div>
      <FlexContainer className={styleModule.homeWrapper}>
        <DialogItemsWrapper chats={chats} onSelectChat={onSelectChat} />
        <>
          {selectedChatLoading ? (
            <Wrapper className={styleModule.loaderWrapper}>
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
    </>
  );
};

export default memo(Home);
