import { ChatInterface, MessageInterface } from "types/types";
import { InferActionsTypes, TypeActions } from "../../types";

export type dialogsActionCreatorType = InferActionsTypes<
  typeof dialogsActionsCreator
>;

export const dialogsActionsCreator = {
  getAllDialogsActionCreator: (dialogs: ChatInterface[]) =>
    ({
      type: TypeActions.DIALOGS__GET_ALL_DIALOGS,
      payload: {
        dialogs
      }
    } as const),
  setSelectedDialog: (selectedDialog: ChatInterface) =>
    ({
      type: TypeActions.DIALOGS__SELECT_DIALOG,
      payload: {
        selectedDialog
      }
    } as const),

  setLoadingAllDialogs: () =>
    ({
      type: TypeActions.DIALOGS__LOADING
    } as const),

  setLoadingSelectedDialog: () =>
    ({
      type: TypeActions.DIALOGS__SELECT_DIALOG_LOADING
    } as const),
  addMessageIntoSelectedDialog: (newMessage: MessageInterface) =>
    ({
      type: TypeActions.DIALOGS__SELECT_DIALOG__ADD_MESSAGE,
      payload: {
        newMessage
      }
    } as const)
};
