import axios from "axios";
import { assoc, compose, identity, ifElse } from "ramda";

import { MethodType, OptionsRequestInterface } from "./types";

class ApiRequest {
  private token: string = localStorage.getItem("auth_token");

  public setToken(token: string) {
    localStorage.setItem("auth_token", token);
    this.token = token;
  }

  public deleteToken() {
    localStorage.removeItem("auth_token");
    this.token = null;
  }

  private completeRequest = (
    url: string,
    method: MethodType,
    options: OptionsRequestInterface
  ) => {
    const { data, config } = options;

    const preBuiltHeaders = compose(
      ifElse(
        () => !!this.token,
        assoc("Authorization", `Bearer ${this.token}`),
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

  public createRequest = <T>(
    url: string,
    method: MethodType,
    options: OptionsRequestInterface
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.completeRequest(url, method, options).then(
        (resp) => {
          resolve(resp.data.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
}

export const instanceApiRequest = new ApiRequest();
