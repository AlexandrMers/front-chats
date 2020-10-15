import { StateInterface } from "./store";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

export type ReduxThunkDispatch<T, R> = ThunkDispatch<StateInterface, T, Action<R>>;

export function useReduxDispatch<T, R>(): ReduxThunkDispatch<T, R> {
  return useDispatch<ReduxThunkDispatch<T, R>>();
}
