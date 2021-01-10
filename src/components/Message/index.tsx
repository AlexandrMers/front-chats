import React, { memo } from "react";
import classNames from "classnames";

import { useFormatRelativeDate } from "hooks/hooks";

import Wrapper from "primitives/Wrapper";

import styleModule from "./style.module.scss";

import "styles/tools/icons.scss";
import WaveLoader from "primitives/WaveLoader";
import Avatar from "primitives/Avatar";
import ImageFilesRow, { AlignRow } from "./ImageFilesRow";
import { calculateStylesContentMsg } from "./helpers";
import { MessagePropsInterface } from "./types";
import ActionsMessage from "./ActionsMessage/ActionsMessage";

const Message = ({ message, isMe, isTyping }: MessagePropsInterface) => {
  const { date } = useFormatRelativeDate(message.createdAt);

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
        <Avatar
          className={classNames(styleModule.avatar_order, {
            [styleModule.avatar_order_me]: isMe
          })}
          name={message.author.fullName}
          //TODO - не реализован функционал аватаров
          avatar={null}
        />

        {isTyping ? (
          <Wrapper
            className={classNames({
              [styleModule.messageWrapper__content_mine]: isMe,
              [styleModule.messageWrapper__content]: !isMe,
              [styleModule.messageWrapper__content_lightGray]: isTyping
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

        {isMe && !isTyping && (
          <ActionsMessage isMe={isMe} isRead={message.isRead} />
        )}
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
