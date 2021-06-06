import { createSlice } from "@reduxjs/toolkit";

import {
  addNewMessage,
  getMessagesByChatId,
  selectChatId,
  sendMessage
} from "./actions";

import { SelectedChatInitialStateInterface } from "./types";
import {
  DataForSendMessageInterface,
  MessageInterface
} from "../../../types/types";
import { compose, uniq, uniqWith } from "ramda";

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

const addMessage = (
  state: SelectedChatInitialStateInterface,
  newMessage: MessageInterface
) => {
  state.selectedChatMessages = state.selectedChatMessages = compose(
    uniq,
    (messages: MessageInterface[]) => [...messages, newMessage]
  )(state.selectedChatMessages);
};

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
      addMessage(state, newMessage);
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

    builder.addCase(addNewMessage, (state, { payload: newMessage }) => {
      addMessage(state, newMessage);
    });
  }
});

export default SelectedChatSlice.reducer;
