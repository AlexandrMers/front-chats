import { ThunkAction } from "redux-thunk";

import { userAPI } from "api/modules/user";

import { StateInterface } from "../../store";
import { InferActionsTypes } from "../../types";
import { userActionsCreators } from "../actions/userActionsCreators";

export type getCurrentUserThunkCreatorType = InferActionsTypes<
  typeof userActionsCreators
>;

export type GetCurrentUserThunkInterface<RType> = ThunkAction<
  RType,
  StateInterface,
  unknown,
  getCurrentUserThunkCreatorType
>;

export const getCurrentUser = (): GetCurrentUserThunkInterface<
  Promise<void>
> => async (dispatch) => {
  const currentUserInfo = await userAPI.getCurrentUser();

  dispatch(userActionsCreators.getAllDialogsActionCreator(currentUserInfo));
};
