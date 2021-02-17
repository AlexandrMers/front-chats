import { createSelector } from "@reduxjs/toolkit";
import { prop, uniqBy } from "ramda";

import { StateInterface } from "state/store";
import { ChatInterface, UserInterface } from "types/types";

function getUsersIdsByProp(chats: ChatInterface[], prop: keyof ChatInterface) {
  return chats.map((chat) => chat[prop]);
}

const selectExistedUsersFromChats = (
  state: StateInterface
): UserInterface[] => {
  const authorsChats = getUsersIdsByProp(state.chatModule.chats, "author");
  const partnersChats = getUsersIdsByProp(state.chatModule.chats, "partner");
  const concatedUsers = authorsChats.concat(partnersChats);

  return uniqBy(prop("id"), concatedUsers);
};

const selectCurrentUser = (state: StateInterface): UserInterface => {
  return state.userModule.userInfo;
};

const selectAllUsers = (state: StateInterface): UserInterface[] =>
  state.userModule.allUsers;

const selectExcludeExistedUsersFromAllUsers = (
  allUsers: UserInterface[],
  excludeUsers: UserInterface[],
  currentUser: UserInterface
) => {
  const excludeUsersIds = excludeUsers.map(prop("id"));
  return allUsers.filter(
    (user) => !excludeUsersIds.includes(user.id) && user.id !== currentUser.id
  );
};

export const selectUsersForCreateChat = createSelector(
  selectAllUsers,
  selectExistedUsersFromChats,
  selectCurrentUser,
  selectExcludeExistedUsersFromAllUsers
);
