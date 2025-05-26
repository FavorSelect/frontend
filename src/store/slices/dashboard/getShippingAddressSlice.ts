import { AddressFormValues } from "@/components/molecules/dashboard/ShippingAddressForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShippingAddressState = {
  addresses: AddressFormValues[];
};

const initialState: ShippingAddressState = {
  addresses: [],
};

const getShippingAddressSlice = createSlice({
  name: "getShippingAddress",
  initialState,
  reducers: {
    setShippingAddresses: (
      state,
      action: PayloadAction<AddressFormValues[]>
    ) => {
      state.addresses = action.payload;
    },
    clearShippingAddresses: (state) => {
      state.addresses = [];
    },
  },
});

export const { setShippingAddresses, clearShippingAddresses } =
  getShippingAddressSlice.actions;
export default getShippingAddressSlice.reducer;
