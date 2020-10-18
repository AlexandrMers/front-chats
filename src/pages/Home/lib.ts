import { StateInterface } from "../../state/store";
import { ChatInterface, UserInterface } from "../../types/types";

export const selectPropsFromStateForHomeCmp = ({
  dialogs: { dialogs, dialogsLoading, selectedDialog, selectedDialogLoading },
  user
}: StateInterface) => ({
  getAllDialogsLoading: dialogsLoading,
  allDialogs: dialogs,
  selectedChat: selectedDialog,
  currentUser: user,
  getLoadingSelectedChat: selectedDialogLoading
});

export const combineSelectorStateForHomeCmp = (data: {
  selectedChat: ChatInterface;
  getLoadingSelectedChat: boolean;
  allDialogs: ChatInterface[];
  getAllDialogsLoading: boolean;
  currentUser: UserInterface;
}) => ({
  selectedChat: data.selectedChat,
  getLoadingSelectedChat: data.getLoadingSelectedChat,
  currentUser: data.currentUser,
  allDialogs: data.allDialogs,
  getAllDialogsLoading: data.getAllDialogsLoading
});
