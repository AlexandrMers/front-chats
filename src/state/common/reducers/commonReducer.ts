import { TypeActions } from "state/types";
import { CommonActionType } from "./types";

interface CommonInitialState {
  errorAuth: Error;
}

const initialState: CommonInitialState = {
  errorAuth: null
};

export const commonReducer = (
  state: CommonInitialState = initialState,
  action: CommonActionType
) => {
  switch (action.type) {
    case TypeActions.SET_ERROR_AUTH:
      return {
        errorAuth: action.payload
      };

    default:
      return state;
  }
};
