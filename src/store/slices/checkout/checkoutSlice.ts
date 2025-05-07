import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  contactInfo: {
    email: string;
    subscribe: boolean;
  };
  shippingAddress: {
    email: string;
    subscribe: boolean;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    saveInfo: boolean;
  };
  paymentMethod: string;
  orderSummary: {
    itemTotal: number;
    subTotal: number;
    tax: number;
    total: number;
  };
  cardDetails: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    saveCard: boolean;
  };
  payoneerDetails: {
    accountEmail: string;
    accountID: string;
  };
  coinbaseDetails: {
    walletAddress: string;
  };
}

const initialState: CheckoutState = {
  contactInfo: {
    email: "",
    subscribe: false,
  },
  shippingAddress: {
    email: "",
    subscribe: false,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  },
  paymentMethod: "Credit/Debit Card",
  orderSummary: {
    itemTotal: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  cardDetails: {
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    saveCard: false,
  },
  payoneerDetails: {
    accountEmail: "",
    accountID: "",
  },
  coinbaseDetails: {
    walletAddress: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setContactInfo(state, action: PayloadAction<CheckoutState["contactInfo"]>) {
      state.contactInfo = action.payload;
    },
    setShippingAddress(
      state,
      action: PayloadAction<CheckoutState["shippingAddress"]>
    ) {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    setCardDetails(state, action: PayloadAction<CheckoutState["cardDetails"]>) {
      state.cardDetails = action.payload;
    },
    setPayoneerDetails(
      state,
      action: PayloadAction<CheckoutState["payoneerDetails"]>
    ) {
      state.payoneerDetails = action.payload;
    },
    setCoinbaseDetails(
      state,
      action: PayloadAction<CheckoutState["coinbaseDetails"]>
    ) {
      state.coinbaseDetails = action.payload;
    },
    setOrderSummary(
      state,
      action: PayloadAction<CheckoutState["orderSummary"]>
    ) {
      state.orderSummary = action.payload;
    },
  },
});

export const {
  setContactInfo,
  setShippingAddress,
  setPaymentMethod,
  setCardDetails,
  setPayoneerDetails,
  setCoinbaseDetails,
  setOrderSummary,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
