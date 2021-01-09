import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";

import createRootReducer, { rootReducer } from "./reducers/rootReducer";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
  devTools: process.env.NODE_ENV !== "production"
});

export type StateInterface = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<StateInterface> = useSelector;
