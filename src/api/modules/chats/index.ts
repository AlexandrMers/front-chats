import { instanceApiRequest } from "../../tools/requestCreator";

import { ChatInterface } from "../../../types/types";
import { MethodType } from "../../tools/types";

export const ChatsApi = {
  getAllChats() {
    return instanceApiRequest.createRequest<ChatInterface[]>(
      `/chats`,
      MethodType.GET,
      {}
    );
  }
};
