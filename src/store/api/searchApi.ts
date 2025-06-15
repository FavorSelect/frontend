import { apiSlice } from "./api";
import { ImageSearchProductApiResponse } from "@/types/real.product";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    imageSearch: builder.mutation<ImageSearchProductApiResponse, FormData>({
      query: (formData) => ({
        url: "api/general/image-search",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useImageSearchMutation } = searchApi;
