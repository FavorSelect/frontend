import { PersonalFormValues } from "@/components/molecules/dashboard/PersonalInformation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: PersonalFormValues | null } = {
  user: null,
};

const getUserPersonalInfoSlice = createSlice({
  name: "getUserPersonalInfo",
  initialState,
  reducers: {
    setUserPersonalInfo: (state, action: PayloadAction<PersonalFormValues>) => {
      state.user = action.payload;
    },
    clearUserPersonalInfo: (state) => {
      state.user = null;
    },
  },
});

export const { setUserPersonalInfo, clearUserPersonalInfo } =
  getUserPersonalInfoSlice.actions;
export default getUserPersonalInfoSlice.reducer;
