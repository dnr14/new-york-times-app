import axios from "axios";

import { HTTPFunctionGetorDelete, HTTPFunctionPostorPut } from "../types/axios";

const baseURL = "https://api.nytimes.com/svc/search/v2";
const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const errorHandler = (error: any) => {
  return error?.message || error || "클라이언트에서 오류가 발생 했습니다.";
};

type HTTPMethod = {
  get: HTTPFunctionGetorDelete;
  delete: HTTPFunctionGetorDelete;
  post: HTTPFunctionPostorPut;
  put: HTTPFunctionPostorPut;
};

const http: HTTPMethod = {
  get: async (url, config) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  delete: async (url, config) => {
    try {
      const res = await axiosInstance.delete(url, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  post: async (url, body, config) => {
    try {
      const res = await axiosInstance.post(url, body, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  put: async (url, body, config) => {
    try {
      const res = await axiosInstance.put(url, body, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
};

export default http;
