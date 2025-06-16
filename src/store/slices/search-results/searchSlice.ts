import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductT } from "@/types/real.product";

interface SearchState {
  products: ProductT[];
  labels: string[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: SearchState = {
  products: [],
  labels: [],
  isLoading: false,
  isError: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setResults: (
      state,
      action: PayloadAction<{ products: ProductT[]; labels: string[] }>
    ) => {
      state.products = action.payload.products;
      state.labels = action.payload.labels;
    },
    resetResults: () => initialState,
  },
});

export const { setLoading, setError, setResults, resetResults } =
  searchSlice.actions;

export default searchSlice.reducer;
