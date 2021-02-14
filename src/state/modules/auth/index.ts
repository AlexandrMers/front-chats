import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

import { UserAPI } from "api/modules/user";

import { instanceApiRequest } from "api/tools/requestCreator";

import { AuthorizationInterface } from "pages/Login/types";
import { RegistrationInterface } from "pages/Registration/types";
import { UserInterface } from "types/types";
import { ErrorMainInterface } from "../../types";

interface AuthModuleStateInterface {
  isAuth: boolean;
  loginLoading: boolean;
  loginError: {
    status: string;
    message: string;
  };
  registrationLoading: boolean;
  registrationError: any;
  registrationSuccess: boolean;
}

const initialState: AuthModuleStateInterface = {
  isAuth: false,
  loginLoading: false,
  loginError: null,
  registrationError: null,
  registrationLoading: false,
  registrationSuccess: false
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

export const registerUser = createAsyncThunk<
  UserInterface,
  RegistrationInterface,
  { rejectValue: ErrorMainInterface }
>("registerUser", async (data, { rejectWithValue }) => {
  try {
    return await UserAPI.register(data);
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

    builder.addCase(registerUser.pending, (state) => {
      state.registrationLoading = true;
      state.registrationError = null;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.registrationSuccess = true;
      state.registrationError = null;
      state.registrationLoading = false;
    });

    builder.addCase(registerUser.rejected, (state, { payload: errorData }) => {
      state.registrationLoading = false;
      state.registrationError = errorData;
      state.registrationSuccess = false;
    });
  }
});

export default AuthSlice.reducer;
