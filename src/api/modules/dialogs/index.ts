import { createRequest } from "api/tools/requestCreator";
import { MethodType } from "api/tools/types";
import { ChatInterface } from "types/types";

export const dialogsAPI = {
  getAllDialogs() {
    return createRequest<ChatInterface[]>(`/chats`, MethodType.GET, {});
  }
};
