import { get, post } from "request";
import type { Response } from "request";
import localStore from "@/utils/localStore";
import { USER_TOKEN_INFO } from "@/constants";

interface loginParams {
  acount: string;
  password: string;
}

interface SignUpParams {
  acount: string;
  password: string;
  code: string;
}

export interface tokenObj {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export const login = (params: loginParams): Promise<Response<tokenObj>> => post("/auth/login", params);

export const register = (params: SignUpParams): Promise<Response> => post("/auth/register", params);

export const refreshToken = (needRefreshToken = false): Promise<Response<tokenObj>> =>
  get("/auth/refreshToken", {
    params: { needRefreshToken },
    headers: {
      Authorization: localStore.get(USER_TOKEN_INFO).refreshToken,
    },
  });
