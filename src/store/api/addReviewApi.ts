/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";

export const addReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add review
    addReview: builder.mutation<any, { formData: FormData }>({
      query: ({ formData }) => ({
        url: "/api/user/review/add",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddReviewMutation } = addReviewApi;
