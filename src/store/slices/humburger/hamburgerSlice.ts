import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HamburgerState {
  isOpen: boolean;
}

const initialState: HamburgerState = {
  isOpen: false,
};

const hamburgerSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleMenu, setMenu } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;
