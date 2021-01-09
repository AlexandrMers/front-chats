import { instanceApiRequest } from "../../tools/requestCreator";
import { UserInterface } from "../../../types/types";
import { MethodType } from "../../tools/types";
import { AuthorizationInterface } from "../../../pages/Login";

export const UserAPI = {
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
  // login(_data: AuthorizationInterface) {
  //   return instanceApiRequest.createRequest<any>(
  //     "/users/5ff34249eb599cb218972caa111",
  //     MethodType.GET,
  //     {}
  //   );
  // }
};
