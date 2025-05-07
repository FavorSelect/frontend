import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuantityState {
  quantity: number;
}

const initialState: QuantityState = {
  quantity: 1,
};

const quantitySlice = createSlice({
  name: "productQuantity",
  initialState,
  reducers: {
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
});

export const { setQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
