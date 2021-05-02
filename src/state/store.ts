import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import createRootReducer from "./modules";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
  devTools: process.env.NODE_ENV !== "production"
});

export type StateInterface = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<StateInterface> = useSelector;
