import axios from "axios";
import { USER_TOKEN_INFO } from "@/constants";
import { refreshToken as handleRefreshToken } from "@/api/auth";
import localStore from "./localStore";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const noInterceptList = ["/auth/login", "/auth/refreshToken"];
let isRefreshing = false;
let requestList: Function[] = [];

/** 请求拦截 */
instance.interceptors.request.use((config) => {
  const { url = "" } = config;
  const tokenObj = localStore.get(USER_TOKEN_INFO);
  if (noInterceptList.includes(url) || !tokenObj) return config;
  const { accessToken, accessTokenExpiresIn, refreshTokenExpiresIn } = tokenObj;
  // access_token 剩余时间小于五分钟
  if (accessTokenExpiresIn - new Date().getTime() < 5 * 60 * 1000) {
    if (!isRefreshing) {
      isRefreshing = true;
      const remainingTime = refreshTokenExpiresIn - new Date().getTime();
      // refresh_token 剩余时间小于一天
      const needRefreshToken = remainingTime < 24 * 60 * 60 * 1000;
      // 请求刷新 token
      handleRefreshToken(needRefreshToken)
        .then((res) => {
          const { data } = res;
          localStore.setToken(data);
          isRefreshing = false;
          return data.accessToken;
        })
        .then((newAccessToken: string) => {
          // 请求完成后，通过新 token 调用期间缓存的接口
          requestList.forEach((cb) => {
            cb(`Bearer ${newAccessToken}`);
          });
          requestList = [];
        });
    }

    // token 刷新期间，先将请求暂存进 requestList ，通过 token 刷新后的回调遍历触发
    const parallelRequest = new Promise((resolve) => {
      requestList.push((accessToken: string) => {
        config.headers!.Authorization = accessToken;
        resolve(config);
      });
    });
    return parallelRequest;
  } else {
    config.headers!.Authorization = accessToken ?? "";
    return config;
  }
});

/** 响应拦截器 */
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.log("interceptors:", error);
    if (error.response.status === 401) {
      localStore.remove(USER_TOKEN_INFO);
      window.location.replace("/#/?reLogin=true");
    }
  }
);

export const get = instance.get;
export const post = instance.post;

export interface Response<T> {
  code: number;
  data: T;
  msg?: string;
}
