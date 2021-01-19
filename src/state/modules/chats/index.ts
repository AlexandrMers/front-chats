import { createSlice } from "@reduxjs/toolkit";

import { InitialStateChatsInterface } from "./types";
import { createNewChat, getChats } from "./actions";

const initialState: InitialStateChatsInterface = {
  chats: [],
  chatsLoading: false,
  chatsError: null,
  createChatLoading: false,
  createChatError: null
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

    builder.addCase(createNewChat.fulfilled, (state, { payload: createdChat }) => {
      state.chats.push(createdChat);
      state.createChatLoading = false;
    });
  }
});

export default ChatsSlice.reducer;
