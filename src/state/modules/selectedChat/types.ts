import { MessageInterface } from "../../../types/types";

export interface SelectedChatInitialStateInterface {
  selectedChatId: string;
  selectedChatLoading: boolean;
  selectedChatMessages: MessageInterface[];
  selectedChatError: any;
  sendMessageError: any;
}
