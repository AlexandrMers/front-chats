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
  };
  message: MessageInterface;
  isMe?: boolean;
  isRead?: boolean;
  isTyping?: boolean;
}

export interface MessageInterface {
  audio?: string;
  avatar: string;
  text: string;
  date: string;
  attachments: AttachmentFileInterface[];
}
