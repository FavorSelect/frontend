import { OrderSuccessResponse } from "@/types/orderSuccess";
import { apiSlice } from "./api";

export interface StripeCheckoutPayload {
  productId: number;
  quantity: number;
  addressId: number;
}

export interface StripeCheckoutResponse {
  id: string;
  url: string;
}

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Stripe Checkout Session
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

    // Finalize Stripe Checkout (Place Order)
    finalizeStripeOrder: builder.query<
      OrderSuccessResponse,
      { session_id: string }
    >({
      query: ({ session_id }) => ({
        url: `/api/user/buy-now/finalize?session_id=${session_id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateStripeCheckoutMutation, useFinalizeStripeOrderQuery } =
  checkoutApi;
