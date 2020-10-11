import { TypeActions } from "state/types";
import { UserInterface } from "types/types";
import { getCurrentUserActionType } from "./types";

const initialState: UserInterface = {
  avatar: null,
  name: null,
  id: null
};

export const userReducer = (
  state: UserInterface = initialState,
  action: getCurrentUserActionType
) => {
  switch (action.type) {
    case TypeActions.CURRENT_USER__GET_CURRENT_USER:
      return {
        ...action.payload
      };

    default:
      return state;
  }
};
