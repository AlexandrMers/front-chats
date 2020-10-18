import { ThunkAction } from "redux-thunk";

import { dialogsAPI } from "api/modules/dialogs";
import { InferActionsTypes } from "../../types";
import { StateInterface } from "../../store";
import { dialogsActionsCreator } from "../actions/dialogsActionCreators";

type getAllDialogsTypeThunkCreator = InferActionsTypes<
  typeof dialogsActionsCreator
>;

type GetAllDialogsThunkCreator<RType> = ThunkAction<
  RType,
  StateInterface,
  unknown,
  getAllDialogsTypeThunkCreator
>;

export const getAllDialogs = (): GetAllDialogsThunkCreator<
  Promise<void>
> => async (dispatch) => {
  dispatch(dialogsActionsCreator.setLoadingAllDialogs());
  const dialogs = await dialogsAPI.getAllDialogs();

  dispatch(dialogsActionsCreator.getAllDialogsActionCreator(dialogs));
};

export const getSelectedDialog = (
  id: string
): GetAllDialogsThunkCreator<Promise<void>> => async (dispatch) => {
  dispatch(dialogsActionsCreator.setLoadingSelectedDialog());
  const selectedDialog = await dialogsAPI.getCurrentDialog(id);

  dispatch(dialogsActionsCreator.setSelectedDialog(selectedDialog));
};
