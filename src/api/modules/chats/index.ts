// Types
import {
  ChatInterface,
  DataForSendMessageInterface,
  MessageInterface
} from "types/types";
import { MethodType } from "api/tools/types";

// Tools
import { instanceApiRequest } from "api/tools/requestCreator";

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

  getMessagesByChatId(fakeDuration = 500) {
    return ({
      selectedChatId: chatId,
      page = 1
    }: {
      selectedChatId: string;
      page: number;
    }) =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await instanceApiRequest.createRequest<{
              chatId: string;
              messages: MessageInterface[];
            }>(`/messages`, MethodType.GET, {
              config: {
                params: {
                  chatId,
                  page
                }
              }
            });

            resolve(response);
          } catch (error) {
            reject(error);
          }
        }, fakeDuration);
      });
  },

  sendMessage({ chatId, text, attachments }: DataForSendMessageInterface) {
    return instanceApiRequest.createRequest<MessageInterface>(
      `/messages/create`,
      MethodType.PUT,
      {
        data: {
          chatId,
          text,
          attachments
        }
      }
    );
  }
};
