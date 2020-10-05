import { UserInterface } from "../../types/types";

export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export interface ActionsMessagePropsInterface {
  isMe: boolean;
  isRead: boolean;
}

export interface MessagePropsInterface {
  message: MessageInterface;
  isMe?: boolean;
  isTyping?: boolean;
}

export interface MessageInterface {
  id: number;
  audio?: string;
  isRead: boolean;
  text: string;
  date: string;
  attachments: AttachmentFileInterface[];
  author: UserInterface;
}
