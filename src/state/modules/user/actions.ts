import { authGuardAsyncThunk } from "../../lib";
import { UserInterface } from "../../../types/types";
import { UserAPI } from "../../../api/modules/user";
import { createAction } from "@reduxjs/toolkit";
import { FileUploadApi } from "../../../api/modules/files";

enum USER_ACTIONS {
  ONLINE = "SET_USER_ONLINE",
  OFFLINE = "SET_USER_OFFLINE"
}

export const getCurrentUser = authGuardAsyncThunk<UserInterface>({
  prefix: "user/currentUser",
  requestFunc: UserAPI.getCurrentUser
});

export const getAllUsers = authGuardAsyncThunk<UserInterface[]>({
  prefix: "users",
  requestFunc: UserAPI.getAllUsers
});

export const uploadUserAvatar = authGuardAsyncThunk<UserInterface, File>({
  prefix: "user/uploadAvatar",
  requestFunc: FileUploadApi.uploadUserAvatar
});

export const setUserOnlineById = createAction<UserInterface>(
  USER_ACTIONS.ONLINE
);

export const setUserOfflineById = createAction<UserInterface>(
  USER_ACTIONS.OFFLINE
);
