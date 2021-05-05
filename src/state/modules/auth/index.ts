import { createAction, createSlice } from "@reduxjs/toolkit";

import {
  confirmRegistrationUser,
  login,
  logout,
  registerUser
} from "./actions";

import { AuthModuleStateInterface } from "./types";

const initialState: AuthModuleStateInterface = {
  isAuth: false,
  loginLoading: false,
  loginError: null,
  registrationError: null,
  registrationLoading: false,
  registrationSuccess: false,
  confirmedRegistration: false,
  confirmedRegistrationLoading: false,
  confirmedRegistrationError: null
};

export const setAuth = createAction<boolean>("SET_AUTH");

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

    builder.addCase(logout.fulfilled, () => {});

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

    builder.addCase(confirmRegistrationUser.pending, (state) => {
      state.confirmedRegistrationLoading = true;
      state.confirmedRegistrationError = null;
      state.confirmedRegistration = false;
    });

    builder.addCase(confirmRegistrationUser.fulfilled, (state) => {
      state.confirmedRegistrationLoading = false;
      state.confirmedRegistrationError = null;
      state.confirmedRegistration = true;
    });

    builder.addCase(
      confirmRegistrationUser.rejected,
      (state, { payload: errorData }) => {
        state.confirmedRegistrationLoading = false;
        state.confirmedRegistrationError = errorData;
        state.confirmedRegistration = false;
      }
    );
  }
});

export default AuthSlice.reducer;
