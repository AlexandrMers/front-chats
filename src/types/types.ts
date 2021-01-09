export interface UserInterface {
  id: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen: Date;
  fullName: string;
  email: string;
}

export interface ChatInterface {
  id: string;
  user: UserInterface;
  unreadCount: number;
  messages: MessageInterface[];
}

export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export interface MessageInterface {
  id: string;
  audio?: string;
  isRead: boolean;
  text: string;
  date: string;
  attachments: AttachmentFileInterface[];
  author: UserInterface;
}
