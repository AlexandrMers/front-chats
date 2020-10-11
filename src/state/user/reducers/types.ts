import { InferActionsTypes } from "../../types";
import { userActionsCreators } from "../actions/userActionsCreators";

export type getCurrentUserActionType = InferActionsTypes<
  typeof userActionsCreators
>;
