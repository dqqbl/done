import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  /** 账号 */
  acount: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatarUrl: string;
}
export const initialUser: UserInfo = {
  id: "",
  acount: "",
  nickname: "",
  avatarUrl: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    updateUser: (state, action) => action.payload,
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
