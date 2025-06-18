import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  productDetailsTab: string;
}

const initialState: TabState = {
  productDetailsTab: "Review",
};

const tabSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setProductDetailsTab(state, action: PayloadAction<string>) {
      state.productDetailsTab = action.payload;
    },
  },
});

export const { setProductDetailsTab } = tabSlice.actions;
export default tabSlice.reducer;
