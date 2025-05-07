import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReviewState {
  sortBy: string;
}

const initialState: ReviewState = {
  sortBy: "recommended",
};

const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = productReviewSlice.actions;
export default productReviewSlice.reducer;
