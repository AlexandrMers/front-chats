export interface UserInterface {
  name: string;
  avatar: string;
  id: string;
  isOnline?: boolean;
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
