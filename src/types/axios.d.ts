import { AxiosRequestConfig } from "axios";

export type HTTPFunctionGetorDelete = <T>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<T>;
export type HTTPFunctionPostorPut = <P, R = void>(
  url: string,
  body?: P,
  config?: AxiosRequestConfig
) => Promise<R>;
export type SuspenceType = "success" | "pending" | "error";
