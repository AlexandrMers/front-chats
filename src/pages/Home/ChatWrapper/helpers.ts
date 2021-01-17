import { ChatInterface, UserInterface } from "../../../types/types";

export function getHeaderChatName(
  chat: ChatInterface,
  currentUser: UserInterface
) {
  return () =>
    chat.author.id === currentUser.id
      ? chat.partner.fullName
      : chat.author.fullName;
}
