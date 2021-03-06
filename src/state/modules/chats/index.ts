import { createSlice } from "@reduxjs/toolkit";

import {
  addNewChat,
  clearUnreadCountMessages,
  createNewChat,
  getChats
} from "./actions";

import { ChatsSliceInterface } from "./types";
import { ChatInterface } from "../../../types/types";
import {
  readMessages,
  updateCountersMessages,
  updateLastMessage
} from "../selectedChat/actions";

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

  state.chats.push({
    ...newChat,
    unreadCountMessages: newChat.unreadCountMessages ?? 0
  });
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

    builder.addCase(updateLastMessage, (state, { payload: newMessage }) => {
      const foundChat = state.chats.find(
        (chat) => chat.id === newMessage.chatId
      );
      if (foundChat) {
        foundChat.lastMessage = newMessage;
      }
    });

    builder.addCase(
      updateCountersMessages,
      (state, { payload: newMessage }) => {
        state.chats =
          Array.isArray(state.chats) && state.chats.length > 0
            ? state.chats.map((chat) => {
                if (chat.id === newMessage.chatId) {
                  return {
                    ...chat,
                    unreadCountMessages: ++chat.unreadCountMessages
                  };
                }
                return chat;
              })
            : [];
      }
    );

    builder.addCase(clearUnreadCountMessages, (state, { payload: id }) => {
      state.chats.forEach((chat) => {
        if (chat.id === id) {
          chat.unreadCountMessages = 0;
        }
      });
    });
  }
});

export default ChatsSlice.reducer;
