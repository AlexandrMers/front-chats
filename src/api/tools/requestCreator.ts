import axios from "axios";
import { MethodType, OptionsRequestInterface } from "./types";

export function completeRequest(
  url: string,
  method: MethodType,
  options: OptionsRequestInterface
) {
  const { data, config } = options;

  const instanceAxios = axios.create({
    baseURL: "http://localhost:9999/",
    withCredentials: true,
    method: method
  });

  return instanceAxios.request({
    ...config,
    data,
    url
  });
}

export function createRequest<T>(
  url: string,
  method: MethodType,
  options: OptionsRequestInterface
): Promise<T> {
  return new Promise((resolve, reject) => {
    completeRequest(url, method, options).then(
      (resp) => {
        resolve(resp.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
