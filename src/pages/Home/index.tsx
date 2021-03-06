import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";

import { Empty } from "antd";
import { WechatOutlined } from "@ant-design/icons";

// Types
import { DataForSendMessageInterface, MessageInterface } from "types/types";

// State
import { useAppDispatch, useTypedSelector } from "state/store";
import { getAllUsers, getCurrentUser } from "state/modules/user/actions";
import { getChats } from "state/modules/chats/actions";
import { logout } from "state/modules/auth/actions";
import {
  clearFiles,
  getMessagesByChatId,
  selectChatId,
  sendMessage,
  updateLastMessage
} from "state/modules/selectedChat/actions";
import {
  selectChatInfo,
  selectChatsSelector,
  selectUnreadCountMessages
} from "./selectors";

// Primitives
import Loader from "primitives/Loader";
import FlexContainer from "primitives/FlexContainer";
import Wrapper from "primitives/Wrapper";

// Components
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";
import HomeHeader from "./HomeHeader";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import messageSound from "audio/icq.mp3";

import styleModule from "./style.module.scss";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(getCurrentUser());
    await dispatch(getAllUsers());
    await dispatch(getChats());
  };

  useEffect(() => {
    getAllData();
  }, []);

  const {
    isLoadingUser,
    currentUser,
    isLoadingChats,
    chats,
    selectedChatId,
    selectedChatLoading,
    selectedChatMessages,
    selectedChatInfo,
    unreadCountMessages
  } = useTypedSelector((state) => {
    return {
      isLoadingUser: state.userModule.loading,
      currentUser: state.userModule.userInfo,
      isLoadingChats: state.chatModule.chatsLoading,
      chats: selectChatsSelector(state),
      selectedChatId: state.selectedChatModule.selectedChatId,
      selectedChatLoading: state.selectedChatModule.selectedChatLoading,
      selectedChatMessages: state.selectedChatModule.selectedChatMessages,
      selectedChatInfo: selectChatInfo(state),
      unreadCountMessages: selectUnreadCountMessages(state)
    };
  }, shallowEqual);

  const onSelectChat = useCallback(
    (selectedChatId: string) => {
      dispatch(selectChatId(selectedChatId));
    },
    [dispatch]
  );

  const getMessagesByChatIdHandler = useCallback(
    ({
      selectedChatId,
      page = 1
    }: {
      selectedChatId: string;
      page?: number;
    }) => {
      dispatch(
        getMessagesByChatId({
          selectedChatId,
          page
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!selectedChatId) return undefined;
    getMessagesByChatIdHandler({ selectedChatId });
  }, [selectedChatId, getMessagesByChatIdHandler]);

  const onSendMessage = useCallback(
    (msgData: DataForSendMessageInterface) => {
      dispatch(sendMessage(msgData)).then((data) => {
        dispatch(clearFiles());
        dispatch(updateLastMessage(data.payload as MessageInterface));
      });
    },
    // eslint-disable-next-line
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
      {currentUser && (
        <HomeHeader
          onLogout={onLogout}
          name={currentUser.fullName}
          id={currentUser.id}
        />
      )}

      <FlexContainer className={styleModule.homeWrapper}>
        <DialogItemsWrapper
          chats={chats}
          onSelectChat={onSelectChat}
          unreadCountMessages={unreadCountMessages}
        />
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
              getMessagesByChatIdHandler={getMessagesByChatIdHandler}
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
                description="???????????????? ???????????? ?????? ???????????????? ??????????"
              />
            </Wrapper>
          )}
        </>
      </FlexContainer>
    </>
  );
};

export default memo(Home);
