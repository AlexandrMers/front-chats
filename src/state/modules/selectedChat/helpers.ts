import { FileInterface, SelectedChatInitialStateInterface } from "./types";
import { DataForSendMessageInterface, MessageInterface } from "types/types";

const createEmptyFile = (file: File, uid: string): FileInterface => ({
  uid,
  id: null,
  status: "uploading",
  size: file.size,
  url: null,
  extension: null,
  publicId: null,
  user: null,
  fileName: file.name,
  originalName: file.name
});

function createNotSentMessage(
  meta: {
    arg: DataForSendMessageInterface;
    requestId: string;
    requestStatus: "pending";
  },
  state: SelectedChatInitialStateInterface
): MessageInterface {
  return {
    text: meta.arg.text,
    id: meta.requestId,
    author: meta.arg.author,
    chatId: meta.arg.chatId,
    isRead: false,
    type: 1,
    createdAt: new Date().toString(),
    loading: true,
    attachments: state.attachedFiles
  };
}

export { createEmptyFile, createNotSentMessage };
