import React, { FC, memo, useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";

import { WechatOutlined } from "@ant-design/icons";
import { createSelector } from "reselect";

import { StateInterface } from "state/store";
import { getAllDialogs, getSelectedDialog } from "state/dialogs/thunk";
import { getCurrentUser as getCurrentUserThunk } from "state/user/thunk/getCurrentUser";

import Loader from "primitives/Loader";
import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";
import { SelectedPropsToHomeCmpInterfacce } from "./types";

import {
  combineSelectorStateForHomeCmp,
  selectPropsFromStateForHomeCmp
} from "./lib";
import FlexContainer from "../../primitives/FlexContainer";

const Home: FC = () => {
  const dispatch = useDispatch();

  const onSelectChatDispatch = useCallback(
    (id: string) => dispatch(getSelectedDialog(id)),
    [dispatch]
  );

  const getDialogs = useCallback(() => dispatch(getAllDialogs()), [dispatch]);

  const getCurrentUser = useCallback(() => dispatch(getCurrentUserThunk()), [
    dispatch
  ]);

  const {
    selectedChat,
    getLoadingSelectedChat,
    currentUser,
    allDialogs,
    getAllDialogsLoading
  } = useSelector<StateInterface, SelectedPropsToHomeCmpInterfacce>(
    createSelector(
      selectPropsFromStateForHomeCmp,
      combineSelectorStateForHomeCmp
    ),
    shallowEqual
  );

  useEffect(() => {
    getDialogs();
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  const onSelectChat = useCallback((selectedChatId: string) => {
    onSelectChatDispatch(selectedChatId);
    // eslint-disable-next-line
  }, []);

  if (getAllDialogsLoading) {
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
      {!!allDialogs && (
        <DialogItemsWrapper chats={allDialogs} onSelectChat={onSelectChat} />
      )}
      <>
        {getLoadingSelectedChat ? (
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
        ) : !!selectedChat ? (
          <ChatWrapper
            key={selectedChat.id}
            chat={selectedChat}
            currentUser={currentUser}
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
