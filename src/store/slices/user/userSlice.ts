import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  profileImage?: string;
  userId?: number;
};

type UserState = {
  userInfo: User | null;
  isLoggedIn: boolean;
  isTwoFactorEnabled: boolean;
};

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  isTwoFactorEnabled: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    setTwoFactorStatus(state, action: PayloadAction<boolean>) {
      state.isTwoFactorEnabled = action.payload;
    },
  },
});

export const { setUser, logout, setTwoFactorStatus } = userSlice.actions;
export default userSlice.reducer;
