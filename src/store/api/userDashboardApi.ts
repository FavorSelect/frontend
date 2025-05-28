import { PersonalFormValues } from "@/components/molecules/dashboard/PersonalInformation";
import { apiSlice } from "./api";
import { AddressFormValues } from "@/components/molecules/dashboard/ShippingAddressForm";

export const userDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShippingAddress: builder.mutation({
      query: ({ data, token }: { data: AddressFormValues; token: string }) => ({
        url: "api/user/address/add",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getShippingAddress: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "api/user/address",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateShippingAddress: builder.mutation({
      query: ({
        data,
        token,
        id,
      }: {
        data: AddressFormValues;
        token: string;
        id: number;
      }) => ({
        url: `api/user/address/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    deleteShippingAddress: builder.mutation({
      query: ({ token, id }) => ({
        url: `api/user/address/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getPersonalInformation: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "api/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updatePersonalInformation: builder.mutation({
      query: ({
        data,
        token,
        id,
      }: {
        data: PersonalFormValues;
        token: string;
        id: number;
      }) => ({
        url: `api/user/edit/profile/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    changePassword: builder.mutation({
      query: ({
        data,
        token,
      }: {
        data: { currentPassword: string; newPassword: string };
        token: string;
      }) => ({
        url: `api/user/edit/change-password`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    enableTwoFactorAuth: builder.mutation({
      query: ({ enable, token }: { enable: boolean; token: string }) => ({
        url: "api/user/two-factor-auth",
        method: "PATCH",
        body: { enable },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getTwoFactorAuthStatus: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "api/user/two-factor-status",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    verifyTwoFactor: builder.mutation({
      query: (verificationCode: string) => ({
        url: "api/auth/verify-two-factor",
        method: "PATCH",
        body: { verificationCode: verificationCode },
      }),
    }),

    requestAccountDeletion: builder.mutation({
      query: ({ token, reason }: { token: string; reason: string }) => ({
        url: "api/support/deletion-request",
        method: "POST",
        body: { reason: reason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getAccountDeletionStatus: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "api/support/account-deletion/status",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    raiseSupportTicket: builder.mutation({
      query: ({ formData, token }: { formData: FormData; token: string }) => ({
        url: "api/support/user/raise-ticket",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getOpenTicket: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "api/support/user/my-tickets",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
  useDeleteShippingAddressMutation,
  useGetPersonalInformationQuery,
  useUpdatePersonalInformationMutation,
  useChangePasswordMutation,
  useEnableTwoFactorAuthMutation,
  useGetTwoFactorAuthStatusQuery,
  useVerifyTwoFactorMutation,
  useRequestAccountDeletionMutation,
  useGetAccountDeletionStatusQuery,
  useRaiseSupportTicketMutation,
  useGetOpenTicketQuery,
} = userDashboardApi;
