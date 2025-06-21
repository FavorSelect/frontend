/* eslint-disable @typescript-eslint/no-explicit-any */
import { WishlistResponse } from "@/types/wishlist";
import { apiSlice } from "./api";

export const wishApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add to wishlist
    addToWishlist: builder.mutation<any, { productId: number }>({
      query: (body) => ({
        url: "/api/user/wishlist/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // Get wishlist items
    getWishlist: builder.query<WishlistResponse, void>({
      query: () => ({
        url: "/api/user/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
    // remove from wishlist
    removeFromWishlist: builder.mutation<any, { wishlistIds: number[] }>({
      query: (body) => ({
        url: `/api/user/wishlist/remove`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishApi;
