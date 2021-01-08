import { TypeActions } from "../../types";

export const commonActionCreators = {
  setErrorAuth: (error: Error) =>
    ({
      type: TypeActions.SET_ERROR_AUTH,
      payload: error
    } as const)
};
