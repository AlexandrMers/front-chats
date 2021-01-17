import { createSelector } from "reselect";

import { StateInterface } from "../../state/store";
import { ChatInterface } from "../../types/types";

const getChatsSelector = (state: StateInterface): ChatInterface[] =>
  state.chatModule.chats;

const getSelectedIdSelector = (state: StateInterface): string =>
  state.selectedChatModule.selectedChatId;

const getSelectedChatInfoSelector = (
  chats: ChatInterface[],
  chatId: string
): ChatInterface | null => {
  const selectedChat = chats.find((chat) => chat.id === chatId);
  return selectedChat ?? null;
};

export const selectChatInfo = createSelector(
  getChatsSelector,
  getSelectedIdSelector,
  getSelectedChatInfoSelector
);
