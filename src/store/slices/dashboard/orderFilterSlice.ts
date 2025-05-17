import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderFilter = "all" | "delivered" | "awaiting";

interface OrderFilterState {
  filter: OrderFilter;
}

const initialState: OrderFilterState = {
  filter: "all",
};

const orderFilterSlice = createSlice({
  name: "orderFilter",
  initialState,
  reducers: {
    setOrderFilter: (state, action: PayloadAction<OrderFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { setOrderFilter } = orderFilterSlice.actions;
export default orderFilterSlice.reducer;
