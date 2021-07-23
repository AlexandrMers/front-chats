import { createAction } from "@reduxjs/toolkit";

// Constants
import { ACTIONS_MESSAGE } from "./constants";

// Libs
import { authGuardAsyncThunk } from "state/lib";

// Api
import { ChatsApi } from "api/modules/chats";
import { FileUploadApi } from "api/modules/files";

// Types
import { DataForSendMessageInterface, MessageInterface } from "types/types";
import { FileInterface } from "./types";

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

export const loadFile = authGuardAsyncThunk<Omit<FileInterface, "uid">, File>({
  prefix: "upload-files/upload",
  requestFunc: FileUploadApi.loadFile
});

export const deleteFile = authGuardAsyncThunk<
  any,
  { publicId: string; uid: string }
>({
  prefix: "upload-files/delete",
  requestFunc: FileUploadApi.deleteFile
});

export const selectChatId = createAction<string>("CHATS/SELECT_CHAT");

export const clearFiles = createAction("CHATS/CLEAR_FILES");

export const addNewMessage = createAction<MessageInterface>(
  ACTIONS_MESSAGE.NEW_MESSAGE
);

export const updateLastMessage = createAction<MessageInterface>(
  ACTIONS_MESSAGE.UPDATE_LAST_MESSAGE
);
