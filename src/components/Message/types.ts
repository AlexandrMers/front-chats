import { MessageInterface } from "../../types/types";

export interface ActionsMessagePropsInterface {
  isMe: boolean;
  isRead: boolean;
}

export interface MessagePropsInterface {
  message: MessageInterface;
  isMe?: boolean;
  isTyping?: boolean;
}
