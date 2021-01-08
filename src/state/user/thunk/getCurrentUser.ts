import { ThunkAction } from "redux-thunk";

import { userAPI } from "api/modules/user";

import { StateInterface } from "../../store";
import { InferActionsTypes } from "../../types";
import { userActionsCreators } from "../actions/userActionsCreators";
import { AuthorizationInterface } from "../../../pages/Login";
import { commonActionCreators } from "../../common/actions/commonActionCreators";

export type getCurrentUserThunkCreatorType = InferActionsTypes<
  typeof userActionsCreators
>;

export type UserThunkInterface<RType> = ThunkAction<
  RType,
  StateInterface,
  unknown,
  getCurrentUserThunkCreatorType
>;

export const getCurrentUser = (): UserThunkInterface<Promise<void>> => async (
  dispatch
) => {
  const currentUserInfo = await userAPI.getCurrentUser();

  dispatch(userActionsCreators.getAllDialogsActionCreator(currentUserInfo));
};

function thunkHandler({
  requestFunction,
  actionSuccess,
  actionError
}: {
  requestFunction: (data: any) => Promise<any>;
  actionSuccess: any;
  actionError: any;
}) {
  return (
    data?: AuthorizationInterface
  ): UserThunkInterface<Promise<any>> => async (dispatch) => {
    try {
      const requestData = await requestFunction(data ?? null);
      dispatch(actionSuccess(requestData ?? null));
    } catch (error) {
      const errorMsg = error.message;
      let errorSent = null;
      console.log("errorMsg -> ", errorMsg);
      if (errorMsg.includes("401")) {
        errorSent = {
          type: "NOT_AUTHORIZED",
          message: error.message
        };
      }
      dispatch(actionError(errorSent));
    }
  };
}

export const login = thunkHandler({
  requestFunction: userAPI.login,
  actionSuccess: userActionsCreators.loginUser,
  actionError: commonActionCreators.setErrorAuth
});
