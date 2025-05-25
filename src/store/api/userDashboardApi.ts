import { apiSlice } from "./api";
import { AddressFormValues } from "@/components/molecules/dashboard/AddressForm";

export const userDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShippingAddress: builder.mutation({
      query: ({
        data,
        token,
      }: {
        data: AddressFormValues;
        token: string | undefined;
      }) => ({
        url: "api/user/address/add",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddShippingAddressMutation } = userDashboardApi;
