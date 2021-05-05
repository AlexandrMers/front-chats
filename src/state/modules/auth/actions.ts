import { createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

import { UserAPI } from "../../../api/modules/user";

import { AuthorizationInterface } from "../../../pages/Login/types";
import { ErrorMainInterface } from "../../types";
import { UserInterface } from "../../../types/types";
import { RegistrationInterface } from "../../../pages/Registration/types";

import { instanceApiRequest } from "../../../api/tools/requestCreator";

import { CLEAR_STATE } from "../../constants";

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

export const logout = createAsyncThunk("logout", async (data, { dispatch }) => {
  instanceApiRequest.deleteToken();
  dispatch({
    type: CLEAR_STATE
  });
  dispatch(push("/login"));
});

export const confirmRegistrationUser = createAsyncThunk<
  string,
  { hash: string },
  { rejectValue: ErrorMainInterface }
>("confirmRegistrationUser", async ({ hash }, { rejectWithValue }) => {
  try {
    return await UserAPI.confirmRegister(hash);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
