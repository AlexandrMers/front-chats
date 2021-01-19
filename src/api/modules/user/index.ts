import { instanceApiRequest } from "../../tools/requestCreator";

import { UserInterface } from "../../../types/types";
import { AuthorizationInterface } from "../../../pages/Login/types";
import { MethodType } from "../../tools/types";

export const UserAPI = {
  getAllUsers() {
    return instanceApiRequest.createRequest<UserInterface[]>(
      "users",
      MethodType.GET,
      {}
    );
  },
  getCurrentUser() {
    return instanceApiRequest.createRequest<UserInterface>(
      `users/me`,
      MethodType.GET,
      {}
    );
  },
  login(data: AuthorizationInterface) {
    return instanceApiRequest.createRequest<{
      token: string;
    }>("/login", MethodType.POST, {
      data: {
        email: data.username,
        password: data.password
      }
    });
  }
};
