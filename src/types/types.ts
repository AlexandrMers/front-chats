import { FileInterface } from "../state/modules/selectedChat/types";

export interface UserInterface {
  id: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen: string;
  fullName: string;
  email: string;
}

export interface ShortUserInterface {
  fullName: string;
  id: string;
}

export interface AdditionalInfoChatInterface {
  name: string;
  id: string;
  isOnline: boolean;
}

export interface ChatInterface {
  id: string;
  name?: string;
  author: ShortUserInterface;
  partner: ShortUserInterface;
  lastMessage?: MessageInterface;
  additionalInfo?: AdditionalInfoChatInterface;
}

export interface DataForSendMessageInterface {
  chatId: string;
  text: string;
  author?: ShortUserInterface;
  attachments: string[];
}

export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export enum MessageType {
  SYSTEM,
  USER
}

export interface MessageInterface {
  id: string;
  chatId: string;
  type: MessageType;
  audio?: string;
  isRead: boolean;
  text: string;
  createdAt: string;
  attachments?: FileInterface[];
  author: ShortUserInterface;
  loading?: boolean;
}
