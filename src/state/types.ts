export enum TypeActions {
  "DIALOGS__GET_ALL_DIALOGS" = "DIALOGS:GET_ALL_DIALOGS",
  "DIALOGS__SELECT_DIALOG" = "DIALOGS:SELECT_DIALOG",
  "CURRENT_USER__GET_CURRENT_USER" = "CURRENT_USER:GET_CURRENT_USER",
  "CURRENT_USER__AUTH" = "CURRENT_USER:AUTH",

  "DIALOGS__LOADING" = "DIALOGS:LOADING",
  "DIALOGS__SELECT_DIALOG_LOADING" = "DIALOGS:SELECT_DIALOG_LOADING",
  "DIALOGS__SELECT_DIALOG__ADD_MESSAGE" = "DIALOGS:ADD_MESSAGE"
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;
