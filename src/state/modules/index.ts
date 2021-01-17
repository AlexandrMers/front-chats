import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import auth from "./auth";
import user from "./user";
import chats from "./chats";
import selectedChat from "./selectedChat";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    authModule: auth,
    userModule: user,
    chatModule: chats,
    selectedChatModule: selectedChat
  });

export default createRootReducer;
