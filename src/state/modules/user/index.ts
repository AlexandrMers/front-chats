import { createSlice } from "@reduxjs/toolkit";

import {
  getAllUsers,
  getCurrentUser,
  setUserOfflineById,
  setUserOnlineById,
  uploadUserAvatar
} from "./actions";

import { setIsOnlineUserStatus } from "./helpers";

import { UserInterface } from "../../../types/types";

const initialState: {
  loading: boolean;
  error: any;
  userInfo: UserInterface;
  allUsers: UserInterface[];
  allUsersLoading: boolean;
  allUsersError: any;
  isAvatarUploadLoading: boolean;
  avatarUploadError: any;
} = {
  loading: false,
  error: null,
  userInfo: null,
  allUsers: [],
  allUsersError: null,
  allUsersLoading: false,
  isAvatarUploadLoading: false,
  avatarUploadError: null
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    });

    builder.addCase(
      getCurrentUser.rejected,
      (state, { payload: errorInfo }) => {
        state.loading = false;
        state.error = errorInfo;
      }
    );

    builder.addCase(getAllUsers.pending, (state) => {
      state.allUsersLoading = true;
      state.error = null;
    });

    builder.addCase(getAllUsers.fulfilled, (state, { payload: users }) => {
      state.allUsersLoading = false;
      state.error = null;
      state.allUsers = users;
    });

    builder.addCase(getAllUsers.rejected, (state, { payload: errorInfo }) => {
      state.allUsersLoading = false;
      state.error = errorInfo;
    });

    builder.addCase(setUserOnlineById, (state, { payload: userData }) => {
      setIsOnlineUserStatus(state.allUsers, userData, true);
    });

    builder.addCase(setUserOfflineById, (state, { payload: userData }) => {
      setIsOnlineUserStatus(state.allUsers, userData, false);
    });

    builder.addCase(uploadUserAvatar.pending, (state) => {
      state.isAvatarUploadLoading = true;
    });

    builder.addCase(uploadUserAvatar.rejected, (state, { payload }) => {
      state.isAvatarUploadLoading = false;
      state.avatarUploadError = payload;
    });

    builder.addCase(
      uploadUserAvatar.fulfilled,
      (state, { payload: newUserInfo }) => {
        state.avatarUploadError = null;
        state.isAvatarUploadLoading = false;
        state.userInfo = newUserInfo;
      }
    );
  }
});

export default UserSlice.reducer;
