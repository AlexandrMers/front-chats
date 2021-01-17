import { push } from "connected-react-router";
import { createAsyncThunk, AsyncThunkOptions } from "@reduxjs/toolkit";
import { instanceApiRequest } from "../api/tools/requestCreator";

export const authGuardAsyncThunk = <ReturnType = {}, EnterType = void>({
  prefix,
  requestFunc,
  options
}: {
  prefix: string;
  requestFunc: (data?: EnterType) => Promise<any>;
  options?: AsyncThunkOptions<EnterType>;
}) =>
  createAsyncThunk(
    prefix,
    async (data: EnterType, thunkAPI) => {
      try {
        return (await requestFunc(data)) as ReturnType;
      } catch (error) {
        if (error.response.status === 401) {
          instanceApiRequest.setToken(null);
          thunkAPI.dispatch(push("/login"));
        }
        console.error(error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
    options
  );