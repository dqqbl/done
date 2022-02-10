import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from '@/types/user'

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
