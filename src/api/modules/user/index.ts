import {createRequest} from "../../tools/requestCreator";
import {UserInterface} from "../../../types/types";
import {MethodType} from "../../tools/types";

export const userAPI = {
  getCurrentUser() {
    return createRequest<UserInterface>(`/currentUser`, MethodType.GET, {});
  }
};
