import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import pauseButton from "assets/icons/pause-button.svg";
import playButton from "assets/icons/play-button.svg";
import audioBg from "assets/icons/audio-bg.svg";

import styleModule from "../style.module.scss";

import Wrapper from "primitives/Wrapper";

import Avatar from "primitives/Avatar";
import WaveLoader from "primitives/WaveLoader";
import ActionsMessage from "../ActionsMessage/ActionsMessage";

import { MessagePropsInterface } from "../types";
import { useFormatRelativeDate } from "hooks/date";
import { calculateStylesContentMsg } from "../helpers";
import {
  calculateRestOfTimeToPercents,
  calculateTimeInPercents,
  fixSymbolsNumber,
  formatRestOfTime,
} from "./helpers";
import { compose } from "ramda";

const useForceUpdate = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  return forceUpdate;
};

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

  const progressBarMessage = useRef(0);
  const restOfTimeMessage = useRef<string>(null);

  const update = useForceUpdate();

  const onCanPlay = useCallback(() => {
    const audioElement = audioRef.current;
    restOfTimeMessage.current = compose(
      formatRestOfTime,
      calculateRestOfTimeToPercents
    )(audioElement.duration, audioElement.currentTime);
    update();
  }, [audioRef.current]);

  const onTimeUpdate = (e: Event) => {
    const element = e.target as HTMLAudioElement;
    const duration = element.duration;
    const currentTime = element.currentTime;

    restOfTimeMessage.current = compose(
      formatRestOfTime,
      calculateRestOfTimeToPercents
    )(duration, currentTime);

    progressBarMessage.current = compose(
      Number,
      fixSymbolsNumber(0) as (num: number) => string,
      calculateTimeInPercents
    )(duration, currentTime);

    update();
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const onPlay = () => setIsPlay(true);
    const onPause = () => setIsPlay(false);
    const onEnded = () => {
      progressBarMessage.current = 0;
      update();
    };

    audioElement.addEventListener("playing", onPlay);
    audioElement.addEventListener("pause", onPause);
    audioElement.addEventListener("timeupdate", onTimeUpdate);
    audioElement.addEventListener("ended", onEnded);

    return () => {
      audioElement.removeEventListener("playing", onPlay);
      audioElement.removeEventListener("pause", onPause);
      audioElement.removeEventListener("timeupdate", onTimeUpdate);
      audioElement.removeEventListener("ended", onEnded);
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
              <audio
                ref={audioRef}
                src={message.audio}
                preload="metadata"
                onCanPlay={onCanPlay}
              />
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
                <time>{restOfTimeMessage.current}</time>
              </div>
            </Wrapper>
            <div
              className={classNames(
                styleModule.messageAudio__progressBar,
                styleModule.progressBar
              )}
              style={{
                width: `${progressBarMessage.current}%`,
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
          {restOfTimeMessage.current && (
            <time className={styleModule.messageWrapper__date}>{date}</time>
          )}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default memo(MessageAudio);
