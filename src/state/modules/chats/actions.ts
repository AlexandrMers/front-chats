import { createAction } from "@reduxjs/toolkit";

import { ChatsApi } from "../../../api/modules/chats";

import { authGuardAsyncThunk } from "../../lib";

import { ChatInterface } from "../../../types/types";

import { CHATS_ACTIONS } from "./constants";

export const getChats = authGuardAsyncThunk<ChatInterface[]>({
  prefix: "chats/getAllChats",
  requestFunc: ChatsApi.getAllChats
});

export const createNewChat = authGuardAsyncThunk<ChatInterface, string>({
  prefix: "chats/create",
  requestFunc: ChatsApi.createChat
});

export const addNewChat = createAction<ChatInterface>(
  CHATS_ACTIONS.ADD_NEW_CHAT
);

export const clearUnreadCountMessages = createAction<string>(
  CHATS_ACTIONS.CLEAR_UNREAD_COUNT_MESSAGES
);
