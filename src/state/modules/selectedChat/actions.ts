import { authGuardAsyncThunk } from "../../lib";
import {
  DataForSendMessageInterface,
  MessageInterface
} from "../../../types/types";
import { ChatsApi } from "../../../api/modules/chats";
import { createAction } from "@reduxjs/toolkit";

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
