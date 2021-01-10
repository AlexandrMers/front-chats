import { createSlice } from "@reduxjs/toolkit";

import { ChatInterface, MessageInterface } from "../../../types/types";
import { authGuardAsyncThunk } from "../../lib";
import { ChatsApi } from "../../../api/modules/chats";

const initialState: {
  chatsLoading: boolean;
  chatsError: any;
  chats: ChatInterface[];
  selectedChatId: string;
  selectedChatLoading: boolean;
  selectedChatMessages: MessageInterface[];
} = {
  chats: [],
  chatsLoading: false,
  chatsError: null,
  selectedChatId: null,
  selectedChatLoading: false,
  selectedChatMessages: []
};

export const getChats = authGuardAsyncThunk<ChatInterface[]>({
  prefix: "chats/getAllChats",
  requestFunc: ChatsApi.getAllChats
});

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

    builder.addCase(getChats.rejected, (state, payload) => {
      state.chatsError = payload;
      state.chatsLoading = false;
    });
  }
});

export default ChatsSlice.reducer;
