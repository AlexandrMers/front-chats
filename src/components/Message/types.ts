export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export interface ActionsMessagePropsInterface {
  isMe: boolean;
  isRead: boolean;
}

export interface MessagePropsInterface {
  user: {
    name: string;
    avatar: string;
    id: string;
  };
  message: MessageInterface;
  isMe?: boolean;
  isTyping?: boolean;
}

export interface MessageInterface {
  audio?: string;
  isRead: boolean;
  text: string;
  date: string;
  attachments: AttachmentFileInterface[];
  author: {
    name: string;
    id: string;
    avatar: string;
  };
}
