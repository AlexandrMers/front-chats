import { authGuardAsyncThunk } from "../../lib";
import { UserInterface } from "../../../types/types";
import { UserAPI } from "../../../api/modules/user";

export const getCurrentUser = authGuardAsyncThunk<UserInterface>({
  prefix: "user/currentUser",
  requestFunc: UserAPI.getCurrentUser
});

export const getAllUsers = authGuardAsyncThunk<UserInterface[]>({
  prefix: "users",
  requestFunc: UserAPI.getAllUsers
});
