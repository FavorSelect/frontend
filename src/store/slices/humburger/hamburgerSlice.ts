import { createSlice } from "@reduxjs/toolkit";

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
    closeMenu: (state) => {
      state.isOpen = false;
    },
    openMenu: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;
