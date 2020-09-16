import React, { memo } from "react";
import classNames from "classnames";

import { useFormatRelativeDate } from "hooks/date";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";

import "styles/tools/icons.scss";

import checkOnceIcon from "assets/check-once.svg";
import checkDoubleIcon from "assets/check-double.svg";

interface AttachmentFileInterface {
  name: string;
  url: string;
}

interface MessagePropsInterface {
  user: {
    name: string;
  };
  message: {
    avatar: string;
    text: string;
    date: string;
    attachments: AttachmentFileInterface[];
  };
  isMe?: boolean;
  isRead?: boolean;
}

const Message = ({ message, user, isMe, isRead }: MessagePropsInterface) => {
  const { date } = useFormatRelativeDate(message.date);

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

        {isMe && (
          <Wrapper
            className={classNames(
              styleModule.messageWrapper__params,
              isMe && styleModule.messageWrapper__params_me
            )}
          >
            <div
              className={classNames(
                "tripplePoint",
                styleModule.messageWrapper__tripplePoint
              )}
            />
            <img
              src={isRead ? checkDoubleIcon : checkOnceIcon}
              alt="icon read"
              className={classNames(
                "iconCheck",
                styleModule.messageWrapper__iconCheck,
                !isRead && styleModule.messageWrapper__iconCheck_left
              )}
            />
          </Wrapper>
        )}
      </Wrapper>

      {message?.attachments.length > 0 && (
        <Wrapper
          className={classNames(
            styleModule.messageWrapper__attachments,
            isMe && styleModule.messageWrapper__attachments_me
          )}
        >
          {message.attachments.map((file) => (
            <Wrapper className={styleModule.messageWrapper__attachment}>
              <img src={file.url} alt="file" />
            </Wrapper>
          ))}
        </Wrapper>
      )}

      <Wrapper
        className={classNames(
          styleModule.messageWrapper__dateWrapper,
          isMe && styleModule.messageWrapper__dateWrapper_me
        )}
      >
        <time className={styleModule.messageWrapper__date}>{date}</time>
      </Wrapper>
    </Wrapper>
  );
};

export default memo(Message);
