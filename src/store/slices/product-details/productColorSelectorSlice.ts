import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  selectedColor: string | null;
}

const initialState: ProductState = {
  selectedColor: null,
};

const productSlice = createSlice({
  name: "productColorSelector",
  initialState,
  reducers: {
    setSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
  },
});

export const { setSelectedColor } = productSlice.actions;
export default productSlice.reducer;
