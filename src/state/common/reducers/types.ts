import { InferActionsTypes } from "../../types";
import { commonActionCreators } from "../actions/commonActionCreators";

export type CommonActionType = InferActionsTypes<typeof commonActionCreators>;
