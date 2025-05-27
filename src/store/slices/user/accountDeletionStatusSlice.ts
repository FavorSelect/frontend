import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeletionStatusState = {
  hasRequestedDeletion: boolean;
  requestId: string | null;
};

const initialState: DeletionStatusState = {
  hasRequestedDeletion: false,
  requestId: null,
};

const accountDeletionStatusSlice = createSlice({
  name: "accountDeletionStatus",
  initialState,
  reducers: {
    setAccountDeletionStatus: (
      state,
      action: PayloadAction<{ hasRequested: boolean; requestId: string | null }>
    ) => {
      state.hasRequestedDeletion = action.payload.hasRequested;
      state.requestId = action.payload.requestId;
    },
  },
});

export const { setAccountDeletionStatus } = accountDeletionStatusSlice.actions;
export default accountDeletionStatusSlice.reducer;
