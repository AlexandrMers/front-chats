export interface ThunkOptionsCustomTypes<
  ThunkArg = void,
  ThunkApiConfig extends AsyncThunkConfig = {}
> {
  condition?(
    arg: ThunkArg,
    api: Pick<GetThunkAPI<ThunkApiConfig>, "getState" | "extra">
  ): boolean | undefined;
  dispatchConditionRejection?: boolean;
  serializeError?: (x: unknown) => GetSerializedErrorType<ThunkApiConfig>;
}
