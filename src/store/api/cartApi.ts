/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetCartSummaryResponse } from "@/types/cart";
import { apiSlice } from "./api";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add to cart
    addToCart: builder.mutation<any, { productId: number; quantity: number }>({
      query: (body) => ({
        url: "/api/user/cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Update cart item quantity
    updateCartItem: builder.mutation<
      any,
      { cartItemId: number; quantity: number }
    >({
      query: ({ cartItemId, quantity }) => ({
        url: `/api/user/cart/update/${cartItemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Get all cart items with summary
    getCartSummary: builder.query<GetCartSummaryResponse, void>({
      query: () => ({
        url: "/api/user/cart-with-summery",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // Delete selected cart items by array of IDs
    deleteSelectedCartItems: builder.mutation<any, { itemIds: number[] }>({
      query: (body) => ({
        url: "/api/user/cart/remove-selected",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useGetCartSummaryQuery,
  useDeleteSelectedCartItemsMutation,
} = cartApi;
