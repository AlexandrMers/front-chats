import React, { memo, useState } from "react";

import Wrapper from "primitives/Wrapper";
import ChatWrapper from "./ChatWrapper";
import DialogItemsWrapper from "./DialogItemsWrapper";

import styleModule from "./style.module.scss";
import { fakeData } from "./DialogItemsWrapper/fakeData";
import { ChatInterface } from "../../types/types";
import { Empty } from "antd";
import { WechatOutlined } from "@ant-design/icons";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<ChatInterface>(null);

  return (
    <Wrapper className={styleModule.homeWrapper}>
      <DialogItemsWrapper chats={fakeData} onSelectChat={setSelectedChat} />
      <>
        {selectedChat ? (
          <ChatWrapper
            key={selectedChat.chatId}
            currentUser={{
              isOnline: true,
              name: "Александр Авдеев",
              avatar: "",
              id: "1"
            }}
            chat={selectedChat}
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

export default memo(Home);
