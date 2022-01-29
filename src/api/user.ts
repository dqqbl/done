import { get } from "request";
import type { Response } from "request";

interface UserInfo {
  id: string;
  acount: string;
  nickname: string;
}

export const getUserDetail = (id = "init"): Promise<Response<UserInfo>> => get(`/users/${id}`);
