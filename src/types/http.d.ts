import { AxiosRequestConfig } from "axios";

export type HTTPGetorDelete = <T>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<T>;
export type HTTPPostorPut = <P, R = void>(
  url: string,
  body?: P,
  config?: AxiosRequestConfig
) => Promise<R>;

export interface HTTPMethod {
  get: HTTPGetorDelete;
  delete: HTTPGetorDelete;
  post: HTTPPostorPut;
  put: HTTPPostorPut;
}
