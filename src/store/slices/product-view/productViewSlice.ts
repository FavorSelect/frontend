import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewState = {
  mode: "grid" | "list";
};

const initialState: ViewState = {
  mode: "grid",
};

const productViewSlice = createSlice({
  name: "productView",
  initialState,
  reducers: {
    setProductViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.mode = action.payload;
    },
  },
});

export const { setProductViewMode } = productViewSlice.actions;
export default productViewSlice.reducer;
