import { instanceApiRequest } from "api/tools/requestCreator";
import { MethodType } from "api/tools/types";
import { ChatInterface } from "types/types";

export const DialogsApi = {
  getAllDialogs() {
    return instanceApiRequest.createRequest<ChatInterface[]>(
      `/chats`,
      MethodType.GET,
      {}
    );
  },
  getCurrentDialog(id: string) {
    return instanceApiRequest.createRequest<ChatInterface>(
      `/chats/${id}`,
      MethodType.GET,
      {}
    );
  }
};
