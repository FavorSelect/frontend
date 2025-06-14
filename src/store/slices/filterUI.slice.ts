import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterUIState = {
  isPending: boolean;
};

const initialState: FilterUIState = {
  isPending: false,
};

const filterUISlice = createSlice({
  name: "filterUI",
  initialState,
  reducers: {
    setPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
  },
});

export const { setPending } = filterUISlice.actions;
export default filterUISlice.reducer;
