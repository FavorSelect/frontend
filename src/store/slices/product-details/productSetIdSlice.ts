import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface setIdState {
  id: number;
}

const initialState: setIdState = {
  id: 1,
};

const productSetIdSlice = createSlice({
  name: "productSetId",
  initialState,
  reducers: {
    setProductId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setProductId } = productSetIdSlice.actions;
export default productSetIdSlice.reducer;
