// request.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, isCancel } from "axios";
import { ApiResponse, RequestError } from "../types/api";
import { isSuccessCode, getCodeMessage } from "./responseCodes";
import { useUserStore } from "../store/userStore";
import { withBase } from "./path";

// 简易的消息提示替代方案
const message = {
  error: (msg: string) => {
    // 实际项目中可以替换为 toast, sonner 等弹窗组件
    console.error(msg);
  }
};

// 1. 创建 Axios 实例
const request: AxiosInstance = axios.create({
  // @ts-expect-error Vite env variables
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Vite 环境下使用 import.meta.env
  timeout: 600000,
  headers: { "Content-Type": "application/json" },
});

// 2. 响应拦截器
request.interceptors.response.use(
  (response) => {
    const resData = response.data as ApiResponse;
    
    // 如果响应类型是 json 并且包含了业务状态码
    if (response.headers["content-type"] === ("application/json") && resData.code !== undefined) {
      if (!isSuccessCode(resData.code)) {
        return Promise.reject(
          new RequestError(resData.msg || getCodeMessage(resData.code) || "未知错误", response.status, resData.code),
        );
      }
      return resData.data; // 固定返回内层 data
    } else {
      return resData;
    }
  },
  (error) => {
    if (isCancel(error)) {
      return Promise.reject(new RequestError("请求已取消", undefined, undefined, true));
    }
    
    const bizCode = error.response?.data?.code as number | undefined;
    const errMsg =
      error.response?.data?.message || (bizCode ? getCodeMessage(bizCode) : undefined) || error.status + " " + error.code;
    const httpStatus = error.status || error.response?.status;
    
    message.error(errMsg);
    
    if (httpStatus === 403 || httpStatus === 401) {
      useUserStore.getState().clearUserInfo();
      window.location.href = withBase("/login");
    }
    return Promise.reject(new RequestError(errMsg, httpStatus, bizCode));
  }
);

// 3. 定义 requestOptions 类型
interface RequestOptions {
  /** true: 参数放 params（URL 查询参数）, false: 参数放 data（请求体），默认根据 method 自动判断 */
  isQuery?: boolean;
  /** 自定义请求配置（会和默认配置合并，优先级更高） */
  customConfig?: AxiosRequestConfig;
}

// 4. 核心：极简 API 工厂
type Method = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 创建 API 函数（支持自定义传参方式、请求配置）
 * @param url 接口地址（纯字符串，无占位符）
 * @param method 请求方法
 * @param defaultOptions 默认请求配置（可选，可全局预设）
 * @returns 可直接调用的 API 函数
 */
export function createApi<P = any, T = any>(url: string, method: Method, defaultOptions: RequestOptions = {}) {
  return (params?: P, requestOptions: RequestOptions = {}) => {
    // 合并默认配置和调用时配置（调用时优先级更高）
    const {
      isQuery = method === "GET", // 默认 GET 用 params，其他用 data
      customConfig = {},
    } = { ...defaultOptions, ...requestOptions };

    // 构建基础请求配置
    const baseConfig: AxiosRequestConfig = {
      url, // 保证调用的时候不会强制加上 '/' 除非需要
      method,
      // 根据 isQuery 决定参数放 params 还是 data
      ...(isQuery ? { params } : { data: params }),
    };

    // 合并自定义配置（customConfig 优先级最高，可覆盖任何基础配置）
    const finalConfig = { ...baseConfig, ...customConfig };
    // 固定调用 request 实例（返回内层 data），不再区分 axios/request
    return request(finalConfig) as Promise<T>;
  };
}

// 5. 便捷别名
export const get = <P = any, T = any>(url: string, defaultOptions?: RequestOptions) =>
  createApi<P, T>(url, "GET", defaultOptions);
export const post = <P = any, T = any>(url: string, defaultOptions?: RequestOptions) =>
  createApi<P, T>(url, "POST", defaultOptions);
export const put = <P = any, T = any>(url: string, defaultOptions?: RequestOptions) =>
  createApi<P, T>(url, "PUT", defaultOptions);
export const del = <P = any, T = any>(url: string, defaultOptions?: RequestOptions) =>
  createApi<P, T>(url, "DELETE", defaultOptions);

// 导出类型
export type { RequestOptions };
