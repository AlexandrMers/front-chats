import { ChatInterface, UserInterface } from "../../types/types";

export interface SelectedPropsToHomeCmpInterfacce {
  selectedChat: ChatInterface;
  getLoadingSelectedChat: boolean;
  allDialogs: ChatInterface[];
  getAllDialogsLoading: boolean;
  currentUser: UserInterface;
}
