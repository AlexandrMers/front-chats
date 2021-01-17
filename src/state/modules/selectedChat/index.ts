import { createSlice } from "@reduxjs/toolkit";

import { SelectedChatInitialStateInterface } from "./types";
import { getMessagesByChatId, selectChatId, sendMessage } from "./actions";
import {
  DataForSendMessageInterface,
  MessageInterface
} from "../../../types/types";

const initialState: SelectedChatInitialStateInterface = {
  selectedChatError: null,
  selectedChatId: null,
  selectedChatLoading: false,
  selectedChatMessages: null,
  sendMessageError: null
};

function createNotSentMessage(meta: {
  arg: DataForSendMessageInterface;
  requestId: string;
  requestStatus: "pending";
}): MessageInterface {
  return {
    text: meta.arg.text,
    id: meta.requestId,
    author: meta.arg.author,
    chatId: meta.arg.chatId,
    isRead: false,
    type: 1,
    createdAt: new Date().toString(),
    loading: true
  };
}

const SelectedChatSlice = createSlice({
  name: "selectedChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectChatId, (state, { payload: selectedChatId }) => {
      state.selectedChatId = selectedChatId;
    });

    builder.addCase(getMessagesByChatId.pending, (state) => {
      state.selectedChatLoading = true;
      state.selectedChatError = null;
    });

    builder.addCase(
      getMessagesByChatId.rejected,
      (state, { payload: errorInfo }) => {
        state.selectedChatLoading = false;
        state.selectedChatError = errorInfo;
      }
    );

    builder.addCase(
      getMessagesByChatId.fulfilled,
      (state, { payload: selectedChatInfo }) => {
        state.selectedChatLoading = false;
        state.selectedChatMessages = selectedChatInfo.messages;
      }
    );

    builder.addCase(sendMessage.pending, (state, { payload, meta }) => {
      const newMessage = createNotSentMessage(meta);
      state.sendMessageError = null;
      state.selectedChatMessages.push(newMessage);
    });

    builder.addCase(
      sendMessage.fulfilled,
      (state, { meta, payload: updatedMessage }) => {
        state.sendMessageError = null;
        const messages = state.selectedChatMessages;
        const indexMsg = messages.findIndex(
          (message) => message.id === meta.requestId
        );
        if (indexMsg === -1) return;
        const notUpdatedMessage = messages[indexMsg];
        messages[indexMsg] = {
          ...notUpdatedMessage,
          ...updatedMessage,
          loading: false
        };
      }
    );
  }
});

export default SelectedChatSlice.reducer;
