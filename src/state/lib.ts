import { push } from "connected-react-router";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { instanceApiRequest } from "../api/tools/requestCreator";

import { ThunkOptionsCustomTypes } from "../thunk";

const STATUSES_ERRORS = [401, 404];

function isErrorAuth(error: any) {
  return STATUSES_ERRORS.includes(error?.response?.status);
}

export const authGuardAsyncThunk = <
  ReturnType = Record<string, never>,
  EnterType = void
>({
  prefix,
  requestFunc,
  options
}: {
  prefix: string;
  requestFunc: (data?: EnterType) => Promise<any>;
  options?: ThunkOptionsCustomTypes<EnterType>;
}) =>
  createAsyncThunk<ReturnType, EnterType>(
    prefix,
    async (data: EnterType, thunkAPI) => {
      try {
        return (await requestFunc(data)) as ReturnType;
      } catch (error: any) {
        if (isErrorAuth(error)) {
          instanceApiRequest.deleteToken();
          thunkAPI.dispatch(push("/login"));
        }
        console.error(error);
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    },
    options
  );
