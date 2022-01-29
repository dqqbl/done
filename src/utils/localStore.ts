import { tokenObj } from "@/api/auth";
import { USER_TOKEN_INFO } from "@/constants";

/**
 * @description: localstrage 的简单封装
 * @param {*}
 */
class localStore {
  get(key: string) {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : result;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  setToken(newTokenObj: tokenObj) {
    const tokenObj = { ...(this.get(USER_TOKEN_INFO) ?? {}) };
    tokenObj.accessToken = `Bearer ${newTokenObj.accessToken}`;
    tokenObj.accessTokenExpiresIn = newTokenObj.accessTokenExpiresIn * 1000 + new Date().getTime();
    if (newTokenObj.refreshToken) {
      tokenObj.refreshToken = `Bearer ${newTokenObj.refreshToken}`;
      tokenObj.refreshTokenExpiresIn = newTokenObj.refreshTokenExpiresIn * 1000 + new Date().getTime();
    }
    this.set(USER_TOKEN_INFO, tokenObj);
  }
}

export default new localStore();
