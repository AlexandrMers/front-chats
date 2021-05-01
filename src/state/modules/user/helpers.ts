import { UserInterface } from "../../../types/types";

export function setIsOnlineUserStatus(
  allUsers: UserInterface[],
  userData: UserInterface,
  isOnline: boolean
): void {
  const indexUser = allUsers.findIndex((user) => user.id === userData.id);
  const user = allUsers[indexUser];

  if (indexUser === -1) {
    return null;
  }

  allUsers[indexUser] = {
    ...user,
    isOnline
  };
}
