import { createSlice } from "@reduxjs/toolkit";

export interface CommonInfo {
  showLogin: boolean;
}

const commonSlice = createSlice({
  name: "common",
  initialState: {
    showLogin: false,
  } as CommonInfo,
  reducers: {
    updateCommon: (state, action) => ({ ...state, ...action.payload }),
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
  },
});

export const { updateCommon, setShowLogin } = commonSlice.actions;
export default commonSlice.reducer;
