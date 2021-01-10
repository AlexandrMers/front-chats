import { createSlice } from "@reduxjs/toolkit";

import { authGuardAsyncThunk } from "../../lib";
import { UserAPI } from "../../../api/modules/user";
import { UserInterface } from "../../../types/types";

export const getCurrentUser = authGuardAsyncThunk<UserInterface>({
  prefix: "user/currentUser",
  requestFunc: UserAPI.getCurrentUser
});

const initialState: {
  loading: boolean;
  error: any;
  userInfo: UserInterface;
} = {
  loading: false,
  error: false,
  userInfo: null
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
  }
});

export default UserSlice.reducer;
