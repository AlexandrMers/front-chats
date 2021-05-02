import { combineReducers, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import auth from "./auth";
import user from "./user";
import chats from "./chats";
import selectedChat from "./selectedChat";

import { CLEAR_STATE } from "../constants";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    authModule: auth,
    userModule: user,
    chatModule: chats,
    selectedChatModule: selectedChat
  });

const rootReducer = (history: History) => (state: any, action: AnyAction) => {
  if (action.type === CLEAR_STATE) {
    state = undefined;
  }

  return createRootReducer(history)(state, action);
};

export default rootReducer;
