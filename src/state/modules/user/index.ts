import { createSlice } from "@reduxjs/toolkit";

import { UserInterface } from "../../../types/types";
import { getAllUsers, getCurrentUser } from "./actions";

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
  }
});

export default UserSlice.reducer;
