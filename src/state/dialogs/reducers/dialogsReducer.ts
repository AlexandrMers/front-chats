import { TypeActions } from "state/types";
import { ChatInterface } from "types/types";
import { dialogsActionCreatorType } from "../actions/dialogsActionCreators";

interface DialogsStateInterface {
  dialogs: ChatInterface[];
  dialogsLoading: boolean;
  selectedDialog: ChatInterface;
  selectedDialogLoading: boolean;
}

const initialState: DialogsStateInterface = {
  dialogs: null,
  dialogsLoading: false,
  selectedDialog: null,
  selectedDialogLoading: false
};

export default (
  state: DialogsStateInterface = initialState,
  action: dialogsActionCreatorType
) => {
  switch (action.type) {
    case TypeActions.DIALOGS__LOADING:
      return {
        ...state,
        dialogsLoading: true
      };

    case TypeActions.DIALOGS__GET_ALL_DIALOGS:
      return {
        ...state,
        dialogs: action.payload.dialogs,
        dialogsLoading: false
      };

    case TypeActions.DIALOGS__SELECT_DIALOG_LOADING:
      return {
        ...state,
        selectedDialogLoading: true
      };

    case TypeActions.DIALOGS__SELECT_DIALOG:
      return {
        ...state,
        selectedDialog: action.payload.selectedDialog,
        selectedDialogLoading: false
      };

    case TypeActions.DIALOGS__SELECT_DIALOG__ADD_MESSAGE:
      return {
        ...state,
        selectedDialog: {
          ...state.selectedDialog,
          messages: [
            ...state.selectedDialog.messages,
            action.payload.newMessage
          ]
        }
      };

    default:
      return state;
  }
};
