import { createAction } from "@reduxjs/toolkit";

import { ACTIONS_MESSAGE } from "./constants";
import { authGuardAsyncThunk } from "../../lib";

import { ChatsApi } from "api/modules/chats";

import {
  DataForSendMessageInterface,
  MessageInterface
} from "../../../types/types";

export const getMessagesByChatId = authGuardAsyncThunk<
  {
    chatId: string;
    messages: MessageInterface[];
  },
  string
>({
  prefix: "chats/getMessages",
  requestFunc: ChatsApi.getMessagesByChatId
});

export const sendMessage = authGuardAsyncThunk<
  MessageInterface,
  DataForSendMessageInterface
>({
  prefix: "chats/sendMessage",
  requestFunc: ChatsApi.sendMessage
});

export const selectChatId = createAction<string>("CHATS/SELECT_CHAT");

export const addNewMessage = createAction<MessageInterface>(
  ACTIONS_MESSAGE.NEW_MESSAGE
);
