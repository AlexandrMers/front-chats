import { TypeActions } from "state/types";
import { UserInterface } from "types/types";
import { userActionType } from "./types";

interface UserInitialStateInterface extends UserInterface {
  isAuth: boolean;
}

const initialState: UserInitialStateInterface = {
  avatar: null,
  name: null,
  id: null,
  isAuth: false
};

export const userReducer = (
  state: UserInitialStateInterface = initialState,
  action: userActionType
) => {
  switch (action.type) {
    case TypeActions.CURRENT_USER__GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload
      };

    case TypeActions.CURRENT_USER__LOGIN:
      return {
        ...state,
        isAuth: true
      };

    case TypeActions.CURRENT_USER__LOGOUT:
      return {
        ...state,
        isAuth: false
      };

    default:
      return state;
  }
};
