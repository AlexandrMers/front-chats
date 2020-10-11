import { TypeActions } from "state/types";
import { ChatInterface } from "types/types";
import { dialogsActionCreatorType } from "../actions/dialogsActionCreators";

interface DialogsStateInterface {
  dialogs: ChatInterface[];
  selectedDialogId: string;
}

const initialState: DialogsStateInterface = {
  dialogs: [],
  selectedDialogId: null
};

export default (
  state: DialogsStateInterface = initialState,
  action: dialogsActionCreatorType
) => {
  switch (action.type) {
    case TypeActions.DIALOGS__GET_ALL_DIALOGS:
      return {
        ...state,
        dialogs: action.payload.dialogs
      };

    case TypeActions.DIALOGS__SELECT_DIALOG:
      return {
        ...state,
        selectedDialogId: action.payload.dialogId
      };

    default:
      return state;
  }
};
