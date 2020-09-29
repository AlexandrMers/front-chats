import React, { FC, memo } from "react";
import ScrollBar from "react-custom-scrollbars";
import classNames from "classnames";

import styleModule from "./style.module.scss";
import Message from "components/Message";
import Wrapper from "primitives/Wrapper";
import MessageAudio from "../../../components/Message/MessageAudio";

const ChatWrapper: FC<any> = () => {
  return (
    <ScrollBar hideTracksWhenNotNeeded>
      <Wrapper className={classNames(styleModule.chatWrapper)}>
        <Message
          key={4}
          message={{
            isRead: true,

            date: "Sun Sep 13 2020 17:54:45",
            text:
              "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
            attachments: [],
            author: {
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1",
              name: "Александр"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
        />

        <Message
          key={8}
          message={{
            isRead: true,
            date: "Tue Sep 15 2020 06:00:45",
            text:
              "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
              },
              {
                name: "море.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339930638_41a205fcab_c.jpg"
              },
              {
                name: "город.jpg",
                url:
                  "https://live.staticflickr.com/65535/50337310643_de579e4bb1_c.jpg"
              }
            ],
            author: {
              name: "Александр",
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
        />

        <Message
          key={9}
          message={{
            isRead: true,
            date: "Mon Sep 14 2020 16:50:48",
            text: "другое сообщение",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
              }
            ],
            author: {
              name: "Александр",
              avatar:
                "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
            id: "1"
          }}
        />

        <Message
          key={10}
          message={{
            isRead: false,
            date: "Mon Sep 14 2020 16:50:48",
            text: "другое сообщение",
            attachments: [],
            author: {
              name: "Александр",
              avatar:
                "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
            id: "1"
          }}
          isMe
        />

        <Message
          key={11}
          message={{
            isRead: true,

            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
              }
            ],
            author: {
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              name: "Александр",
              id: "1"
            }
          }}
          user={{
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            name: "Александр",
            id: "1"
          }}
        />

        <Message
          key={12}
          message={{
            isRead: true,
            attachments: [],
            text: null,
            date: null,
            author: {
              name: "Александр",
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
          isTyping
        />

        <Message
          key={13}
          message={{
            isRead: true,
            attachments: [],
            text: "Приветствую",
            date: null,
            author: {
              name: "Александр",
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
          isMe
        />

        <Message
          key={14}
          message={{
            isRead: false,

            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [
              {
                name: "девушка.jpg",
                url:
                  "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
              }
            ],
            author: {
              name: "Александр",
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
          isMe
        />

        <MessageAudio
          key={15}
          message={{
            isRead: true,

            date: "Tue Sep 15 2020 06:00:45",
            text: "",
            attachments: [],
            audio: "https://sound-pack.net/download/Sound_00619.wav",
            author: {
              name: "Александр",
              avatar:
                "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
              id: "1"
            }
          }}
          user={{
            name: "Александр",
            avatar:
              "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
            id: "1"
          }}
        />
      </Wrapper>
    </ScrollBar>
  );
};

export default memo(ChatWrapper);
