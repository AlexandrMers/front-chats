import React, { memo } from "react";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";
import classNames from "classnames";

import "styles/tools/icons.scss";

interface MessagePropsInterface {
  user: {
    name: string;
  };
  message: {
    avatar: string;
    text: string;
    date: string;
  };
  isMe?: boolean;
  isRead?: boolean;
}

const Message = ({ message, user, isMe }: MessagePropsInterface) => {
  return (
    <Wrapper
      className={classNames(
        styleModule.messageWrapper,
        isMe && styleModule.messageWrapper_mine
      )}
    >
      <Wrapper
        className={classNames(
          styleModule.messageWrapper__contentInner,
          isMe && styleModule.messageWrapper__contentInner_reverse
        )}
      >
        <Wrapper
          className={classNames(
            styleModule.messageWrapper__avatar,
            isMe && styleModule.messageWrapper__avatar_mine
          )}
        >
          <img src={message.avatar} alt={`avatar ${user.name}`} />
        </Wrapper>

        <Wrapper
          className={
            isMe
              ? styleModule.messageWrapper__content_mine
              : styleModule.messageWrapper__content
          }
        >
          <p className={styleModule.messageWrapper__text}>{message.text}</p>
        </Wrapper>

        <Wrapper className={styleModule.messageWrapper__params}>
          <div className="tripplePoint"></div>
          <div className="iconCheck"></div>
        </Wrapper>
      </Wrapper>

      <Wrapper
        className={classNames(
          styleModule.messageWrapper__dateWrapper,
          isMe && styleModule.messageWrapper__dateWrapper_me
        )}
      >
        <time className={styleModule.messageWrapper__date}>{message.date}</time>
      </Wrapper>
    </Wrapper>
  );
};

export default memo(Message);
