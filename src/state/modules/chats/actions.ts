import { ChatsApi } from "../../../api/modules/chats";

import { authGuardAsyncThunk } from "../../lib";
import { ChatInterface } from "../../../types/types";

export const getChats = authGuardAsyncThunk<ChatInterface[]>({
  prefix: "chats/getAllChats",
  requestFunc: ChatsApi.getAllChats
});

export const createNewChat = authGuardAsyncThunk<ChatInterface, string>({
  prefix: "chats/create",
  requestFunc: ChatsApi.createChat
});
