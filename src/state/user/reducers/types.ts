import { InferActionsTypes } from "../../types";
import { userActionsCreators } from "../actions/userActionsCreators";

export type userActionType = InferActionsTypes<
  typeof userActionsCreators
>;
