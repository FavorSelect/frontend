import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTab: string;
}

const initialState: TabState = {
  activeTab: "Raise Ticket",
};

const supportTab = createSlice({
  name: "supportTab",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = supportTab.actions;
export default supportTab.reducer;
