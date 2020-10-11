import React, { FC, memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Empty } from "antd";
import { WechatOutlined } from "@ant-design/icons";

import { StateInterface } from "../../state/store";
import { getAllDialogs } from "../../state/dialogs/thunk";

import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";

import { ChatInterface, UserInterface } from "../../types/types";
import { getCurrentUser } from "../../state/user/thunk/getCurrentUser";

interface HomeCmpInterface {
  dialogs: ChatInterface[];
  currentUser: UserInterface;
  getAllDialogs: () => void;
  getCurrentUser: () => void;
}

const Home: FC<HomeCmpInterface> = ({
  dialogs,
  currentUser,
  getAllDialogs,
  getCurrentUser
}) => {
  const [selectedChat, setSelectedChat] = useState<ChatInterface>(null);

  useEffect(() => {
    getAllDialogs();
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (!currentUser.id) {
    //TODO - Здесь должен будет быть лоадер, который будет крутиться, пока не получена информация о текущем авторизованном пользователе.
    return null;
  }

  return (
    <Wrapper className={styleModule.homeWrapper}>
      <DialogItemsWrapper chats={dialogs} onSelectChat={setSelectedChat} />
      <>
        {selectedChat ? (
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
    </Wrapper>
  );
};

const mapStateToProps = (state: StateInterface) => {
  const dialogs = state.dialogs.dialogs;
  const currentUser = state.user;

  return {
    dialogs,
    currentUser
  };
};

const HomeCmp = compose<FC<HomeCmpInterface>>(
  memo,
  connect(mapStateToProps, { getAllDialogs, getCurrentUser })
)(Home);

export default HomeCmp;
