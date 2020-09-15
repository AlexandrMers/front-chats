import React, { memo } from "react";

import Wrapper from "primitives/Wrapper";
import Message from "components/Message";

const Home = () => {
  return (
    <Wrapper
      styles={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        padding: "50px",
      }}
    >
      <Message
        message={{
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          date: "Sun Sep 13 2020 17:54:45",
          text:
            "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
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
        }}
        user={{
          name: "Александр",
        }}
        isMe
      />
    </Wrapper>
  );
};

export default memo(Home);
