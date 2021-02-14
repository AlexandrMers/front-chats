import { instanceApiRequest } from "../../tools/requestCreator";

import { RegistrationInterface } from "pages/Registration/types";
import { AuthorizationInterface } from "pages/Login/types";
import { UserInterface } from "types/types";
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
  },
  register(data: RegistrationInterface) {
    return instanceApiRequest.createRequest<UserInterface>(
      "/register",
      MethodType.POST,
      {
        data
      }
    );
  },
  confirmRegister(hash: string) {
    return instanceApiRequest.createRequest<string>(
      "/confirm-registration",
      MethodType.POST,
      {
        data: {
          hash
        }
      }
    );
  }
};
