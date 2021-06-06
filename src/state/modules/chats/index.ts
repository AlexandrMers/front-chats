import { createSlice } from "@reduxjs/toolkit";

import { addNewChat, createNewChat, getChats } from "./actions";

import { ChatsSliceInterface } from "./types";
import { ChatInterface } from "../../../types/types";

const initialState: ChatsSliceInterface = {
  chats: [],
  chatsLoading: false,
  chatsError: null,
  createChatLoading: false,
  createChatError: null
};

const addChat = (state: ChatsSliceInterface, newChat: ChatInterface) => {
  const isExistChat = !!state.chats.find((chat) => chat.id === newChat.id);

  if (isExistChat) {
    return;
  }

  state.chats.push(newChat);
};

const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.pending, (state) => {
      state.chatsLoading = true;
      state.chatsError = null;
    });

    builder.addCase(getChats.fulfilled, (state, { payload: chats }) => {
      state.chats = chats;
      state.chatsLoading = false;
    });

    builder.addCase(getChats.rejected, (state, { payload: errorInfo }) => {
      state.chatsError = errorInfo;
      state.chatsLoading = false;
    });

    builder.addCase(createNewChat.pending, (state) => {
      state.createChatError = null;
      state.createChatLoading = true;
    });

    builder.addCase(createNewChat.rejected, (state, { payload: errorInfo }) => {
      state.createChatError = errorInfo;
      state.createChatLoading = false;
    });

    builder.addCase(
      createNewChat.fulfilled,
      (state, { payload: createdChat }) => {
        addChat(state, createdChat);
        state.createChatLoading = false;
      }
    );

    builder.addCase(addNewChat, (state, { payload: createdChat }) => {
      addChat(state, createdChat);
    });
  }
});

export default ChatsSlice.reducer;
