import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  productImageUrl: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    coverImageUrl: string;
    productName: string;
    productDescription: string;
  };
}

interface Order {
  id: number;
  uniqueOrderId: string;
  orderStatus: string;
  orderDate: string;
  createdAt: string;
  deliveryDate: string | null;
  paymentMethod: string;
  paymentStatus: string;
  recipientName: string;
  shippingDate: string | null;
  totalAmount: string;
  updatedAt: string;
  orderItems: OrderItem[];
  shippingAddress: {
    id: number;
    userId: number;
    recipientName: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    type: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface OrderDetailsState {
  order: Order | null;
}

const initialState: OrderDetailsState = {
  order: null,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
