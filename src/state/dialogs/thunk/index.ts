import { ThunkAction } from "redux-thunk";

import { dialogsAPI } from "api/modules/dialogs";
import { InferActionsTypes } from "../../types";
import { StateInterface } from "../../store";
import { dialogsActionsCreator } from "../actions/dialogsActionCreators";

type getAllDialogsTypeThunkCreator = InferActionsTypes<
  typeof dialogsActionsCreator
>;

type ProfileThunkCreatorType<RType> = ThunkAction<
  RType,
  StateInterface,
  unknown,
  getAllDialogsTypeThunkCreator
>;

export const getAllDialogs = (): ProfileThunkCreatorType<
  Promise<void>
> => async (dispatch) => {
  const dialogs = await dialogsAPI.getAllDialogs();

  dispatch(dialogsActionsCreator.getAllDialogsActionCreator(dialogs));
};
