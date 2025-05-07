import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SizeState {
  selectedSize: string | null;
}

const initialState: SizeState = {
  selectedSize: null,
};

const sizeSlice = createSlice({
  name: "productSizeSelector",
  initialState,
  reducers: {
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
  },
});

export const { setSelectedSize } = sizeSlice.actions;
export default sizeSlice.reducer;
