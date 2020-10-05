import React, { FC, memo, useMemo } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Wrapper from "primitives/Wrapper";
import { fakeDataMessages } from "./fakeData";
import MessageAudio from "../../../components/Message/MessageAudio";
import Message from "../../../components/Message";
import { UserInterface } from "../../../types/types";

const ChatWrapper: FC<any> = () => {
  const currentUser = useMemo<UserInterface>(
    () => ({
      name: "Александр Авдеев",
      id: "1",
      avatar: ""
    }),
    []
  );

  return (
    <ScrollBar hideTracksWhenNotNeeded>
      <Wrapper className={classNames(styleModule.chatWrapper)}>
        <>
          {fakeDataMessages.map((message) => {
            const isAudioMsg = !!message.audio;

            return (
              <Wrapper className={styleModule.messageWrapper} key={message.id}>
                {isAudioMsg ? (
                  <MessageAudio
                    message={message}
                    isMe={currentUser.id === message.author.id}
                  />
                ) : (
                  <Message
                    message={message}
                    isMe={currentUser.id === message.author.id}
                  />
                )}
              </Wrapper>
            );
          })}
        </>
      </Wrapper>
    </ScrollBar>
  );
};

export default memo(ChatWrapper);
