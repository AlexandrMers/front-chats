import { push } from "connected-react-router";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { instanceApiRequest } from "../api/tools/requestCreator";

import { ThunkOptionsCustomTypes } from "../thunk";

const STATUSES_ERRORS = [401, 404];

function isErrorAuth(error: {
  response: {
    status: number;
  };
}) {
  return STATUSES_ERRORS.includes(error.response.status);
}

export const authGuardAsyncThunk = <ReturnType = {}, EnterType = void>({
  prefix,
  requestFunc,
  options
}: {
  prefix: string;
  requestFunc: (data?: EnterType) => Promise<any>;
  options?: ThunkOptionsCustomTypes<EnterType>;
}) =>
  createAsyncThunk(
    prefix,
    async (data: EnterType, thunkAPI) => {
      try {
        return (await requestFunc(data)) as ReturnType;
      } catch (error) {
        if (isErrorAuth(error)) {
          instanceApiRequest.deleteToken();
          thunkAPI.dispatch(push("/login"));
        }
        console.error(error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
    options
  );
