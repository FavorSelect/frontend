import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetPasswordState {
  email: string;
}

const initialState: ResetPasswordState = {
  email: "",
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setResetPasswordData(state, action: PayloadAction<ResetPasswordState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setResetPasswordData } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
