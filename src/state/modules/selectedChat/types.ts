import { UploadFileStatus } from "antd/lib/upload/interface";
import { MessageInterface } from "types/types";

export interface FileInterface {
  uid: string;
  fileName: string;
  size: number;
  url: string;
  publicId: string;
  user: string;
  extension: string;
  id: string;
  status: UploadFileStatus;
  originalName: string;
}

export type FileFromServerInterface = Omit<FileInterface, "uid">;

export interface SelectedChatInitialStateInterface {
  selectedChatId: string;
  selectedChatLoading: boolean;
  selectedChatMessages: MessageInterface[];
  selectedChatError: any;
  sendMessageError: any;
  attachedFiles: FileInterface[];
}
