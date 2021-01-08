import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunkReact from "redux-thunk";

import dialogsReducer from "./dialogs/reducers/dialogsReducer";
import { userReducer } from "./user/reducers/userReducer";
import { commonReducer } from "./common/reducers/commonReducer";

const rootReducer = combineReducers({
  dialogs: dialogsReducer,
  user: userReducer,
  common: commonReducer
});

export type StateInterface = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkReact))
);

export default store;
