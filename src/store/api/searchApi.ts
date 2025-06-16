import { apiSlice } from "./api";
import {
  ImageSearchProductApiResponse,
  ProductApiResponse,
  SearchSuggestionsResponse,
} from "@/types/real.product";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    imageSearch: builder.mutation<ImageSearchProductApiResponse, FormData>({
      query: (formData) => ({
        url: "api/general/image-search",
        method: "POST",
        body: formData,
      }),
    }),

    getSearchSuggestions: builder.query<SearchSuggestionsResponse, string>({
      query: (searchTerm) => ({
        url: `api/general/search/suggestions?q=${encodeURIComponent(
          searchTerm
        )}`,
        method: "GET",
      }),
    }),
    searchProductsByQuery: builder.mutation<ProductApiResponse, string>({
      query: (query) => ({
        url: `api/general/products/search/query?query=${encodeURIComponent(
          query
        )}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useImageSearchMutation,
  useGetSearchSuggestionsQuery,
  useSearchProductsByQueryMutation,
} = searchApi;
