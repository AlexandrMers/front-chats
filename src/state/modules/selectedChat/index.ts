import { createSlice } from "@reduxjs/toolkit";
import { compose, uniq } from "ramda";

// Actions
import {
  addNewMessage,
  clearFiles,
  deleteFile,
  getMessagesByChatId,
  loadFile,
  selectChatId,
  sendMessage
} from "./actions";

// Types
import { SelectedChatInitialStateInterface } from "./types";
import { MessageInterface } from "types/types";

// Helpers
import { createNotSentMessage, createEmptyFile } from "./helpers";

// Libs
import { deleteOneFileFromState, updateFileIntoState } from "./libsForState";

const initialState: SelectedChatInitialStateInterface = {
  selectedChatError: null,
  selectedChatId: null,
  selectedChatLoading: false,
  selectedChatMessages: null,
  sendMessageError: null,
  attachedFiles: []
};

const addMessage = (
  state: SelectedChatInitialStateInterface,
  newMessage: MessageInterface
) => {
  if (
    state.selectedChatId === newMessage.chatId &&
    state.selectedChatMessages
  ) {
    state.selectedChatMessages = compose(
      uniq,
      (messages: MessageInterface[]) => [...messages, newMessage]
    )(state.selectedChatMessages);
  }
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

    builder.addCase(sendMessage.pending, (state, { meta }) => {
      const newMessage = createNotSentMessage(meta, state);
      state.selectedChatMessages = [...state.selectedChatMessages, newMessage];
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

    builder.addCase(
      loadFile.pending,
      (state, { meta: { arg: file, requestId: uid } }) => {
        const newEmptyFile = createEmptyFile(file, uid);
        state.attachedFiles.push(newEmptyFile);
      }
    );

    builder.addCase(
      loadFile.fulfilled,
      (state, { payload: uploadedFile, meta: { requestId: uid } }) => {
        updateFileIntoState({
          state,
          uid,
          rewriteFields: {
            ...uploadedFile,
            status: "success"
          }
        });
      }
    );

    builder.addCase(
      loadFile.rejected,
      (state, { meta: { requestId: uid } }) => {
        updateFileIntoState({
          state,
          uid,
          rewriteFields: {
            status: "error"
          }
        });
      }
    );

    builder.addCase(
      deleteFile.pending,
      (state, { meta: { arg: fileInfo } }) => {
        updateFileIntoState({
          state,
          uid: fileInfo.uid,
          rewriteFields: {
            status: "uploading"
          }
        });
      }
    );

    builder.addCase(
      deleteFile.rejected,
      (state, { meta: { arg: fileInfo } }) => {
        updateFileIntoState({
          state,
          uid: fileInfo.uid,
          rewriteFields: {
            status: "error"
          }
        });
      }
    );

    builder.addCase(
      deleteFile.fulfilled,
      (state, { meta: { arg: fileInfo } }) => {
        deleteOneFileFromState(state, fileInfo);
      }
    );

    builder.addCase(clearFiles, (state) => {
      state.attachedFiles = [];
    });
  }
});

export default SelectedChatSlice.reducer;
