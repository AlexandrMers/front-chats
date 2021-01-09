import { combineReducers } from "redux";
import user from "./user/userReducer";
import { connectRouter } from "connected-react-router";
import { History } from "history";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user
  });

export default createRootReducer;

export const rootReducer = combineReducers({
  user
});
