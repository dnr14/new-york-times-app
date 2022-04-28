import axios, { AxiosError } from "axios";
import { HTTPMethod } from "../types/http";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    /**
     * 요청은 이루어졌으나, 2xx의 범위를 벗어난 상태입니다.
     * 뉴욕 타임즈는 401, 429에러는 제공합니다.
     * 401은 허용되지 않은 API-Key를 사용했을 때 발생 하는 code입니다.
     * 429는 짧은 시간에 많은 요청을 했을 때 발생 하는 code입니다.
     */
    if (error.response) {
      switch (error.response.status) {
        case 429:
          error.message = "요청이 너무 많습니다. 조금만 기다려주세요.";
          break;
        case 401:
          error.message = "잘못된 인증입니다. 인증키를 확인해주세요.";
          break;
        default:
          error.message = "서버에 문제가 있습니다. 잠시 후 요청해주세요.";
          break;
      }
    }
    return Promise.reject(error);
  }
);

const http: HTTPMethod = {
  get: async (url, config) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data.response;
    } catch (e) {
      throw errorHandler(e);
    }
  },
  delete: async (url, config) => {
    try {
      const res = await axiosInstance.delete(url, config);
      return res.data.response;
    } catch (e) {
      throw errorHandler(e);
    }
  },
  post: async (url, body, config) => {
    try {
      const res = await axiosInstance.post(url, body, config);
      return res.data.response;
    } catch (e) {
      throw errorHandler(e);
    }
  },
  put: async (url, body, config) => {
    try {
      const res = await axiosInstance.put(url, body, config);
      return res.data.response;
    } catch (e) {
      throw errorHandler(e);
    }
  },
};

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return new Error(error.message);
  }
  return error;
};

export default http;
