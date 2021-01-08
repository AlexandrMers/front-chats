import { UserInterface } from "types/types";
import { TypeActions } from "../../types";

export const userActionsCreators = {
  getAllDialogsActionCreator: (currentUserInfo: UserInterface) =>
    ({
      type: TypeActions.CURRENT_USER__GET_CURRENT_USER,
      payload: currentUserInfo
    } as const),
  loginUser: () =>
    ({
      type: TypeActions.CURRENT_USER__LOGIN
    } as const),
  logoutUser: () =>
    ({
      type: TypeActions.CURRENT_USER__LOGOUT
    } as const)
};
