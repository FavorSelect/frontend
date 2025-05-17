import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReviewFilter = "all" | "delivered" | "canceled";

interface ReviewFilterState {
  filter: ReviewFilter;
}

const initialState: ReviewFilterState = {
  filter: "all",
};

const orderFilterSlice = createSlice({
  name: "reviewFilter",
  initialState,
  reducers: {
    setReviewFilter: (state, action: PayloadAction<ReviewFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { setReviewFilter } = orderFilterSlice.actions;
export default orderFilterSlice.reducer;
