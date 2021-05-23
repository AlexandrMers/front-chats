import { authGuardAsyncThunk } from "../../lib";
import { UserInterface } from "../../../types/types";
import { UserAPI } from "../../../api/modules/user";
import { createAction } from "@reduxjs/toolkit";

export const getCurrentUser = authGuardAsyncThunk<UserInterface>({
  prefix: "user/currentUser",
  requestFunc: UserAPI.getCurrentUser
});

export const getAllUsers = authGuardAsyncThunk<UserInterface[]>({
  prefix: "users",
  requestFunc: UserAPI.getAllUsers
});

export const setUserOnlineById = createAction<UserInterface>("SET_USER_ONLINE");

export const setUserOfflineById =
  createAction<UserInterface>("SET_USER_OFFLINE");
