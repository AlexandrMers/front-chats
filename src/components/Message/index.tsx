import React, { FC, memo } from "react";
import classNames from "classnames";

import { useFormatRelativeDate } from "hooks/date";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";

import "styles/tools/icons.scss";

import checkOnceIcon from "assets/check-once.svg";
import checkDoubleIcon from "assets/check-double.svg";
import WaveLoader from "../../primitives/WaveLoader";
import { MessageInterface } from "./types";
import ImageFilesRow, { AlignRow } from "./ImageFilesRow";
import { calculateStylesContentMsg } from "./helpers";

interface MessagePropsInterface {
  user: {
    name: string;
  };
  message: MessageInterface;
  isMe?: boolean;
  isRead?: boolean;
  isTyping?: boolean;
}

const ActionsMessage: FC<{
  isMe: boolean;
  isRead: boolean;
}> = ({ isMe, isRead }) => {
  return (
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
  );
};

const Message = ({
  message,
  user,
  isMe,
  isRead,
  isTyping,
}: MessagePropsInterface) => {
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

        {isTyping ? (
          <Wrapper
            className={classNames({
              [styleModule.messageWrapper__content_mine]: isMe,
              [styleModule.messageWrapper__content]: !isMe,
              [styleModule.messageWrapper__content_lightGray]: isTyping,
              [styleModule.messageWrapper__content_mine_lightGray]: isTyping,
            })}
          >
            <WaveLoader />
          </Wrapper>
        ) : message.text ? (
          <Wrapper
            className={classNames(calculateStylesContentMsg(isMe, isTyping))}
          >
            <p className={styleModule.messageWrapper__text}>{message.text}</p>
          </Wrapper>
        ) : (
          <ImageFilesRow
            message={message}
            alignRow={isMe ? AlignRow.END : AlignRow.START}
          />
        )}

        {isMe && !isTyping && <ActionsMessage isMe={isMe} isRead={isRead} />}
      </Wrapper>

      {message.text && message?.attachments.length > 0 && (
        <ImageFilesRow
          message={message}
          alignRow={isMe ? AlignRow.END : AlignRow.START}
        />
      )}

      {date && (
        <Wrapper
          className={classNames(
            styleModule.messageWrapper__dateWrapper,
            isMe && styleModule.messageWrapper__dateWrapper_me
          )}
        >
          <time className={styleModule.messageWrapper__date}>{date}</time>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default memo(Message);
