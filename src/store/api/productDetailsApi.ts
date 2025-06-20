/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDetailsApiResponse } from "@/types/real.product";
import { apiSlice } from "./api";

export const productDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get product details
    getProductDetails: builder.query<ProductDetailsApiResponse, string>({
      query: (id) => ({
        url: `/api/general/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ProductDetails", id }],
    }),
    addReview: builder.mutation<any, { formData: FormData }>({
      query: ({ formData }) => ({
        url: "/api/user/review/add",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: (result) => [
        { type: "ProductDetails", id: result?.productId },
      ],
    }),
    updateReview: builder.mutation<
      any,
      { reviewId: string; formData: FormData }
    >({
      query: ({ reviewId, formData }) => ({
        url: `/api/user/review/${reviewId}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: (result) => [
        { type: "ProductDetails", id: result?.productId },
      ],
    }),

    deleteReview: builder.mutation<any, string>({
      query: (reviewId) => ({
        url: `/api/user/review/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result) => [
        { type: "ProductDetails", id: result?.productId },
      ],
    }),
    // Like review toggle mutation
    likeReviewToggle: builder.mutation<any, string>({
      query: (reviewId) => ({
        url: `/api/user/review/${reviewId}/like-toggle`,
        method: "POST",
      }),

      invalidatesTags: (result) => [
        { type: "ProductDetails", id: result?.productId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductDetailsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useLikeReviewToggleMutation,
} = productDetailsApi;
