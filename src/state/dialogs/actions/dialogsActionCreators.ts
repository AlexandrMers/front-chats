import { ChatInterface } from "types/types";
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
  setSelectedDialog: (dialogId: string) =>
    ({
      type: TypeActions.DIALOGS__SELECT_DIALOG,
      payload: {
        dialogId
      }
    } as const)
};
