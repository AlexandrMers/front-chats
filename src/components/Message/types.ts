export interface AttachmentFileInterface {
  name: string;
  url: string;
}

export interface MessageInterface {
  avatar: string;
  text: string;
  date: string;
  attachments: AttachmentFileInterface[];
}
