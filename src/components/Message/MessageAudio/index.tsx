import React, { FC, memo, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import pauseButton from "assets/pause-button.svg";
import playButton from "assets/play-button.svg";
import audioBg from "assets/audio-bg.svg";

import styleModule from "../style.module.scss";

import Wrapper from "primitives/Wrapper";
import Avatar from "primitives/Avatar";
import WaveLoader from "primitives/WaveLoader";
import ActionsMessage from "../ActionsMessage/ActionsMessage";

import { MessagePropsInterface } from "../types";
import { useFormatRelativeDate } from "hooks/date";
import { calculateStylesContentMsg } from "../helpers";

const MessageAudio: FC<MessagePropsInterface> = ({
  message,
  user,
  isMe,
  isRead,
  isTyping,
}) => {
  const { date } = useFormatRelativeDate(message.date);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onTimeUpdate = (e: Event) => {
    const element = e.target as HTMLAudioElement;
    const duration = element.duration;
    const currentTime = element.currentTime;

    const restOfTime = duration - currentTime;

    console.log("rest of time => ", restOfTime.toFixed(2));
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const onPlay = () => setIsPlay(true);
    const onPause = () => setIsPlay(false);

    audioElement.addEventListener("playing", onPlay);
    audioElement.addEventListener("pause", onPause);
    audioElement.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioElement.removeEventListener("playing", onPlay);
      audioElement.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleAudioPlay = () => {
    if (isPlay) {
      audioRef.current.pause();
      return;
    }
    audioRef.current.play();
  };

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
            [styleModule.avatar_order_me]: isMe,
          })}
          name={user.name}
          avatar={message.avatar}
        />

        {isTyping ? (
          <Wrapper
            className={classNames({
              [styleModule.messageWrapper__content_mine]: isMe,
              [styleModule.messageWrapper__content]: !isMe,
              [styleModule.messageWrapper__content_lightGray]: isTyping,
            })}
          >
            <WaveLoader />
          </Wrapper>
        ) : (
          <Wrapper
            className={classNames(
              calculateStylesContentMsg(isMe, isTyping),
              styleModule.messageWrapper__content_audio
            )}
          >
            <Wrapper className={styleModule.messageWrapper__content_audioInner}>
              <audio ref={audioRef} src={message.audio} />
              <Wrapper
                className={
                  styleModule.messageWrapper__content_audioInner_button
                }
                appendProps={{
                  onClick: toggleAudioPlay,
                }}
              >
                {!isPlay ? (
                  <img src={playButton} alt="play-button" />
                ) : (
                  <img src={pauseButton} alt="pause-button" />
                )}
              </Wrapper>
              <div className={styleModule.messageAudio__audioBg}>
                <img src={audioBg} alt="audio-bg" />
              </div>
              <div className={styleModule.messageAudio__totalTime}>
                <time>0:19</time>
              </div>
            </Wrapper>
            <div
              className={classNames(
                styleModule.messageAudio__progressBar,
                styleModule.progressBar
              )}
              style={{
                width: "35%",
              }}
            />
          </Wrapper>
        )}

        {isMe && !isTyping && <ActionsMessage isMe={isMe} isRead={isRead} />}
      </Wrapper>

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

export default memo(MessageAudio);
