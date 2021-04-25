import { createSlice } from "@reduxjs/toolkit";

import { UserInterface } from "../../../types/types";
import {
  getAllUsers,
  getCurrentUser,
  setUserOfflineById,
  setUserOnlineById
} from "./actions";

const initialState: {
  loading: boolean;
  error: any;
  userInfo: UserInterface;
  allUsers: UserInterface[];
  allUsersLoading: boolean;
  allUsersError: any;
} = {
  loading: false,
  error: false,
  userInfo: null,
  allUsers: [],
  allUsersError: null,
  allUsersLoading: false
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

    builder.addCase(setUserOnlineById, (state, { payload: joinedUser }) => {
      const indexUser = state.allUsers.findIndex(
        (user) => user.id === joinedUser.id
      );
      const user = state.allUsers[indexUser];

      if (indexUser === -1) {
        return state;
      }

      state.allUsers[indexUser] = {
        ...user,
        isOnline: true
      };
    });

    builder.addCase(setUserOfflineById, (state, { payload: leavedUser }) => {
      const indexUser = state.allUsers.findIndex(
        (user) => user.id === leavedUser.id
      );
      const user = state.allUsers[indexUser];

      if (indexUser === -1) {
        return state;
      }

      state.allUsers[indexUser] = {
        ...user,
        isOnline: false
      };
    });
  }
});

export default UserSlice.reducer;
