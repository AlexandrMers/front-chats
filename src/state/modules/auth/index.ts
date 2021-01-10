import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserAPI } from "../../../api/modules/user";

import { AuthorizationInterface } from "../../../pages/Login/types";
import { instanceApiRequest } from "../../../api/tools/requestCreator";
import { ErrorMainInterface } from "../../types";
import { push } from "connected-react-router";

const initialState: {
  isAuth: boolean;
  loginLoading: boolean;
  loginError: {
    status: string;
    message: string;
  };
} = {
  isAuth: false,
  loginLoading: false,
  loginError: null
};

export const setAuth = createAction<boolean>("SET_AUTH");

export const login = createAsyncThunk<
  {
    token: string;
  },
  AuthorizationInterface,
  {
    rejectValue: ErrorMainInterface;
  }
>("login", async (data, { rejectWithValue, dispatch }) => {
  try {
    const dataToken = await UserAPI.login(data);
    instanceApiRequest.setToken(dataToken.token);
    dispatch(push("/home"));
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
      state.isAuth = false;
    });

    builder.addCase(login.fulfilled, (state) => {
      state.loginLoading = false;
      state.isAuth = true;
    });

    builder.addCase(login.rejected, (state, { payload: errorData }) => {
      state.loginLoading = false;
      state.loginError = errorData;
    });

    builder.addCase(setAuth, (state, { payload: isAuth }) => {
      state.isAuth = isAuth;
    });
  }
});

export default AuthSlice.reducer;
