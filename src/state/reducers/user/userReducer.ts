import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authGuardAsyncThunk } from "../../lib";

import { UserAPI } from "../../../api/modules/user";

import { AuthorizationInterface } from "../../../pages/Login";
import { UserInterface } from "../../../types/types";
import { instanceApiRequest } from "../../../api/tools/requestCreator";
import { push } from "connected-react-router";

export const loginUser = createAsyncThunk(
  "login",
  async (data: AuthorizationInterface, thunkAPI) => {
    try {
      const dataToken = await UserAPI.login(data);
      instanceApiRequest.setToken(dataToken.token);

      await thunkAPI.dispatch(getMe());
      thunkAPI.dispatch(push("/home"));

      return dataToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMe = authGuardAsyncThunk<UserInterface>({
  prefix: "users/me",
  requestFunc: UserAPI.getCurrentUser,
  options: {}
});

const initialState: {
  isAuth: boolean;
  loginLoading: boolean;
  userInfo: UserInterface;
} = {
  isAuth: false,
  loginLoading: false,
  userInfo: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginLoading = false;
      state.isAuth = false;
    });

    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.loginLoading = false;
      state.isAuth = true;
      state.userInfo = payload;
    });

    builder.addCase(getMe.rejected, (state) => {
      state.loginLoading = false;
      state.isAuth = false;
    });
  }
});

export default userSlice.reducer;
