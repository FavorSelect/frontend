import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  email: string;
  password: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData(state, action: PayloadAction<LoginState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLoginData } = loginSlice.actions;
export default loginSlice.reducer;
