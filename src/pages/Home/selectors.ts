import { createSelector } from "reselect";

import { StateInterface } from "../../state/store";
import { ChatInterface, UserInterface } from "../../types/types";

const getChatsSelector = (state: StateInterface): ChatInterface[] =>
  state.chatModule.chats;

const getCurrentUserSelector = (state: StateInterface): UserInterface =>
  state.userModule.userInfo;

const getAllUsersSelector = (state: StateInterface): UserInterface[] =>
  state.userModule.allUsers;

const getSelectedIdSelector = (state: StateInterface): string =>
  state.selectedChatModule.selectedChatId;

const getSelectedChatInfoSelector = (
  chats: ChatInterface[],
  chatId: string,
  userInfo: UserInterface,
  allUsers: UserInterface[]
): ChatInterface | null => {
  const selectedChat = chats.find((chat) => chat.id === chatId);
  if (!selectedChat) return null;
  return {
    ...selectedChat,
    additionalInfo: buildAdditionalDataForChats(
      userInfo.id,
      selectedChat,
      allUsers
    )
  };
};

function buildAdditionalDataForChats(
  currentUserId: string,
  chat: ChatInterface,
  allUsers: UserInterface[]
) {
  const partnerUser = allUsers.find((user) => user.id === chat.partner.id);
  const authorUser = allUsers.find((user) => user.id === chat.author.id);

  return currentUserId === chat.author.id
    ? {
        name: chat.partner.fullName,
        id: chat.partner.id,
        isOnline: partnerUser.isOnline
      }
    : {
        name: chat.author.fullName,
        id: chat.author.id,
        isOnline: authorUser.isOnline
      };
}

const formatChatsSelector = (
  chats: ChatInterface[],
  userInfo: UserInterface,
  allUsers: UserInterface[]
): ChatInterface[] => {
  return chats.map((chat) => {
    const currentUserId = userInfo?.id;
    return {
      ...chat,
      additionalInfo: buildAdditionalDataForChats(currentUserId, chat, allUsers)
    };
  });
};

export const selectChatInfo = createSelector(
  getChatsSelector,
  getSelectedIdSelector,
  getCurrentUserSelector,
  getAllUsersSelector,
  getSelectedChatInfoSelector
);

export const selectChatsSelector = createSelector(
  getChatsSelector,
  getCurrentUserSelector,
  getAllUsersSelector,
  formatChatsSelector
);
