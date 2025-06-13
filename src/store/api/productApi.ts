import { BannerResponse } from "@/types/banner";
import { apiSlice } from "./api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<BannerResponse, void>({
      query: () => ({
        url: "api/general/products",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductQuery } = productApi;
