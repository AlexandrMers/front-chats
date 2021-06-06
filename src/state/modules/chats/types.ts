import { ChatInterface } from "../../../types/types";

export interface ChatsSliceInterface {
  chatsLoading: boolean;
  chatsError: any;
  chats: ChatInterface[];
  createChatLoading: boolean;
  createChatError: any;
}
