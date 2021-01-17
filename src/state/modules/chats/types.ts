import { ChatInterface } from "../../../types/types";

export interface InitialStateChatsInterface {
  chatsLoading: boolean;
  chatsError: any;
  chats: ChatInterface[];
}
