import { createSelector } from "reselect";

import { StateInterface } from "../../state/store";
import { ChatInterface, UserInterface } from "../../types/types";

const getChatsSelector = (state: StateInterface): ChatInterface[] =>
  state.chatModule.chats;

const getCurrentUserSelector = (state: StateInterface): UserInterface =>
  state.userModule.userInfo;

const getSelectedIdSelector = (state: StateInterface): string =>
  state.selectedChatModule.selectedChatId;

const getSelectedChatInfoSelector = (
  chats: ChatInterface[],
  chatId: string,
  userInfo: UserInterface
): ChatInterface | null => {
  const selectedChat = chats.find((chat) => chat.id === chatId);
  if (!selectedChat) return null;
  return {
    ...selectedChat,
    name: excludeCurrentUserName(userInfo.id, selectedChat)
  };
};

function excludeCurrentUserName(currentUserId: string, chat: ChatInterface) {
  return currentUserId === chat.author.id
    ? chat.partner.fullName
    : chat.author.fullName;
}

const formatChatsSelector = (
  chats: ChatInterface[],
  userInfo: UserInterface
): ChatInterface[] => {
  return chats.map((chat) => {
    const currentUserId = userInfo.id;
    return {
      ...chat,
      name: excludeCurrentUserName(currentUserId, chat)
    };
  });
};

export const selectChatInfo = createSelector(
  getChatsSelector,
  getSelectedIdSelector,
  getCurrentUserSelector,
  getSelectedChatInfoSelector
);

export const selectChatsSelector = createSelector(
  getChatsSelector,
  getCurrentUserSelector,
  formatChatsSelector
);
