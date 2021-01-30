export interface UserInterface {
  id: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen: Date;
  fullName: string;
  email: string;
}

export interface ShortUserInterface {
  fullName: string;
  id: string;
}

export interface ChatInterface {
  id: string;
  name?: string;
  author: ShortUserInterface;
  partner: ShortUserInterface;
  lastMessage: any;
}

export interface DataForSendMessageInterface {
  chatId: string;
  text: string;
  author?: ShortUserInterface;
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
  attachments?: AttachmentFileInterface[];
  author: ShortUserInterface;
  loading?: boolean;
}
