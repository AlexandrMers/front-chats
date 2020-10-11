import { AxiosRequestConfig } from "axios";

export enum MethodType {
  POST = "post",
  GET = "get",
  DELETE = "delete",
  PUT = "put"
}

export interface ConfigRequestInterface {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

export type MapRequestMethodsType = {
  [key in MethodType]: (config: ConfigRequestInterface) => Promise<any>;
};

export interface OptionsRequestInterface {
  data?: any;
  config?: AxiosRequestConfig;
}
