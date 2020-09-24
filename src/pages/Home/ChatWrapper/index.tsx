import React, { FC, memo } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Message from "components/Message";
import Wrapper from "primitives/Wrapper";
import MessageAudio from "../../../components/Message/MessageAudio";

const ChatWrapper: FC<any> = () => {
  return (
    <ScrollBar hideTracksWhenNotNeeded autoHide>
      <Wrapper className={classNames(styleModule.chatWrapper)}>
        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            date: "Sun Sep 13 2020 17:54:45",
            text:
              "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
            attachments: [],
          }}
          user={{
            name: "Александр",
          }}
        />

        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            date: "Tue Sep 15 2020 06:00:45",
            text:
              "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg",
              },
              {
                name: "море.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339930638_41a205fcab_c.jpg",
              },
              {
                name: "город.jpg",
                url:
                  "https://live.staticflickr.com/65535/50337310643_de579e4bb1_c.jpg",
              },
            ],
          }}
          user={{
            name: "Александр",
          }}
        />

        <Message
          message={{
            avatar:
              "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
            date: "Mon Sep 14 2020 16:50:48",
            text: "другое сообщение",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg",
              },
            ],
          }}
          user={{
            name: "Александр",
          }}
          isRead
        />

        <Message
          message={{
            avatar:
              "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
            date: "Mon Sep 14 2020 16:50:48",
            text: "другое сообщение",
            attachments: [],
          }}
          user={{
            name: "Александр",
          }}
          isMe
          isRead={false}
        />

        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg",
              },
            ],
          }}
          user={{
            name: "Александр",
          }}
        />

        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            attachments: [],
            text: null,
            date: null,
          }}
          user={{
            name: "Александр",
          }}
          isTyping
        />

        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            attachments: [],
            text: "Приветствую",
            date: null,
          }}
          user={{
            name: "Александр",
          }}
          isMe
        />

        <Message
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg",
              },
            ],
          }}
          user={{
            name: "Александр",
          }}
          isMe
        />

        <MessageAudio
          message={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [],
            audio: "https://sound-pack.net/download/Sound_00619.wav",
          }}
          user={{
            name: "Александр",
          }}
        />
      </Wrapper>
    </ScrollBar>
  );
};

export default memo(ChatWrapper);
