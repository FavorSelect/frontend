import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordState {
  password: string;
  confirmPassword: string;
}

const initialState: PasswordState = {
  password: "",
  confirmPassword: "",
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setPassword(state, action: PayloadAction<PasswordState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
