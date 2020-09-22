import { MessageInterface } from "../components/Message/types";

export interface UserInterface {
  name: string;
  avatar: string;
  id: string;
}

export interface ChatInterface {
  chatId: string;
  user: UserInterface;
  lastMessage: MessageInterface;
  unreadCount: number;
}
