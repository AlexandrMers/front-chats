export enum TypeActions {
  "SET_ERROR_AUTH" = "COMMON:ERROR_AUTH",

  "DIALOGS__GET_ALL_DIALOGS" = "DIALOGS:GET_ALL_DIALOGS",
  "DIALOGS__SELECT_DIALOG" = "DIALOGS:SELECT_DIALOG",
  "CURRENT_USER__GET_CURRENT_USER" = "CURRENT_USER:GET_CURRENT_USER",
  "CURRENT_USER__LOGIN" = "CURRENT_USER:LOGIN",
  "CURRENT_USER__LOGOUT" = "CURRENT_USER:LOGOUT",

  "DIALOGS__LOADING" = "DIALOGS:LOADING",
  "DIALOGS__SELECT_DIALOG_LOADING" = "DIALOGS:SELECT_DIALOG_LOADING",
  "DIALOGS__SELECT_DIALOG__ADD_MESSAGE" = "DIALOGS:ADD_MESSAGE"
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;
