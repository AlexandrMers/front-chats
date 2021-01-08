import axios, { AxiosRequestConfig } from "axios";
import { MethodType, OptionsRequestInterface } from "./types";
import { assoc, compose, identity, ifElse } from "ramda";

export class ApiRequest {
  //TODO - токен придется убрать !!!
  // static token: string = localStorage.getItem("auth_token");
  static token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjMwMjA0ZDYwNTU5NWI0ZDliZmYyZSIsImNvbmZpcm1lZCI6ZmFsc2UsImxhc3RTZWVuIjoiMjAyMS0wMS0wOFQwOTowOToxOC45MDRaIiwiZnVsbE5hbWUiOiLQkNC70LXQutGB0LDQvdC00YAg0JDQstC00LXQtdCyIiwiZW1haWwiOiJicmF0dmFpbG9sY29AbWFpbC5ydSIsImlhdCI6MTYxMDA5OTc4MiwiZXhwIjoxNjEwMTAzMzgyfQ.6vqSs1N3epblJg9loCFQJgjUZSVMb7nsO14XA9T1wPE";

  completeRequest = (
    url: string,
    method: MethodType,
    options: OptionsRequestInterface
  ) => {
    const { data, config } = options;

    const preBuiltHeaders = compose(
      ifElse(
        () => !!ApiRequest.token,
        assoc("Authorization", `Bearer ${ApiRequest.token}`),
        identity
      )
    )({});

    const instanceAxios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      method: method
    });

    return instanceAxios.request({
      ...config,
      headers: preBuiltHeaders,
      data,
      url
    });
  };

  createRequest = <T>(
    url: string,
    method: MethodType,
    options: OptionsRequestInterface
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.completeRequest(url, method, options).then((resp) => {
        resolve(resp.data.data);
      }, reject);
    });
  };
}

export const instanceApiRequest = new ApiRequest();
