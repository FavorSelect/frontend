import { OrderSuccessResponse } from "@/types/orderSuccess";
import { apiSlice } from "./api";
import { CartOrderSuccessResponse } from "@/types/cartOrderSuccess";

export interface StripeCheckoutPayload {
  productId: number;
  quantity: number;
  addressId: number;
}

export interface StripeCartCheckoutPayload {
  addressId: number;
}

export interface StripeCheckoutResponse {
  id: string;
  url: string;
}

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStripeCheckout: builder.mutation<
      StripeCheckoutResponse,
      StripeCheckoutPayload
    >({
      query: (body) => ({
        url: "/api/user/buy-now/checkout",
        method: "POST",
        body,
      }),
    }),
    createCartStripeCheckout: builder.mutation<
      StripeCheckoutResponse,
      StripeCartCheckoutPayload
    >({
      query: (body) => ({
        url: "/api/user/cart/checkout",
        method: "POST",
        body,
      }),
    }),
    finalizeStripeOrder: builder.query<
      OrderSuccessResponse,
      { session_id: string }
    >({
      query: ({ session_id }) => ({
        url: `/api/user/buy-now/finalize?session_id=${session_id}`,
        method: "GET",
      }),
    }),

    // Finalize Stripe Checkout (Place Order)
    finalizeCartStripeOrder: builder.query<
      CartOrderSuccessResponse,
      { session_id: string }
    >({
      query: ({ session_id }) => ({
        url: `/api/user/cart/finalize?session_id=${session_id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateStripeCheckoutMutation,
  useCreateCartStripeCheckoutMutation,
  useFinalizeStripeOrderQuery,
  useFinalizeCartStripeOrderQuery,
} = checkoutApi;
