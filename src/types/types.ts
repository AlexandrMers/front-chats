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
  author: ShortUserInterface;
  partner: ShortUserInterface;
  lastMessage: any;
}

export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export interface MessageInterface {
  id: string;
  chatId: string;
  type: number;
  audio?: string;
  isRead: boolean;
  text: string;
  createdAt: string;
  attachments?: AttachmentFileInterface[];
  author: ShortUserInterface;
}
