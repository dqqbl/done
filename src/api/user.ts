import { get } from "request";
import type { Response } from "request";
import { UserInfo } from "@/reducer/user";

export const getUserDetail = (id = "init"): Promise<Response<UserInfo>> => get(`/users/${id}`);
