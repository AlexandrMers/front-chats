import { createSlice } from "@reduxjs/toolkit";

import { InitialStateChatsInterface } from "./types";
import { getChats } from "./actions";

const initialState: InitialStateChatsInterface = {
  chats: [],
  chatsLoading: false,
  chatsError: null
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
  }
});

export default ChatsSlice.reducer;
