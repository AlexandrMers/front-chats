import { instanceApiRequest } from "../../tools/requestCreator";

import {
  ChatInterface,
  DataForSendMessageInterface,
  MessageInterface
} from "../../../types/types";

import { MethodType } from "../../tools/types";

export const ChatsApi = {
  getAllChats() {
    return instanceApiRequest.createRequest<ChatInterface[]>(
      `/chats`,
      MethodType.GET,
      {}
    );
  },

  createChat(partnerId: string) {
    return instanceApiRequest.createRequest<ChatInterface>(
      `/chats/create`,
      MethodType.PUT,
      {
        data: {
          partnerId
        }
      }
    );
  },

  getMessagesByChatId(chatId: string) {
    return instanceApiRequest.createRequest<{
      chatId: string;
      messages: MessageInterface[];
    }>(`/messages`, MethodType.GET, {
      config: {
        params: {
          chatId
        }
      }
    });
  },
  sendMessage({ chatId, text }: DataForSendMessageInterface) {
    return instanceApiRequest.createRequest<MessageInterface>(
      `/messages/create`,
      MethodType.PUT,
      {
        data: {
          chatId,
          text
        }
      }
    );
  }
};
