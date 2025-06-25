/* eslint-disable @typescript-eslint/no-explicit-any */
import { PersonalFormValues } from "@/components/molecules/dashboard/PersonalInformation";
import { apiSlice } from "./api";
import { AddressFormValues } from "@/components/molecules/dashboard/ShippingAddressForm";
import { OrdersResponse, ReviewsResponse } from "@/types";
import { AddressApiResponse, AddressDeleteResponse } from "@/types/addresses";

export const userDashboardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFilteredOrders: builder.query<OrdersResponse, { status?: string }>({
      query: ({ status }) => ({
        url: status
          ? `api/user/my-orders?status=${status}`
          : `api/user/my-orders`,
        method: "GET",
      }),
    }),

    getOrdersById: builder.query<any, string>({
      query: (id) => ({
        url: `api/user/my-orders/${id}`,
        method: "GET",
      }),
    }),

    getReviews: builder.query<ReviewsResponse, void>({
      query: () => ({
        url: "api/user/my-reviews",
        method: "GET",
      }),
    }),

    addShippingAddress: builder.mutation({
      query: (data: AddressFormValues) => ({
        url: "api/user/address/add",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["ShippingAddress"],
    }),
    getShippingAddress: builder.query<AddressApiResponse, void>({
      query: () => ({
        url: "api/user/address",
        method: "GET",
      }),
      providesTags: ["ShippingAddress"],
    }),
    updateShippingAddress: builder.mutation({
      query: ({
        data,
        id,
      }: {
        data: AddressFormValues;

        id: number;
      }) => ({
        url: `api/user/address/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteShippingAddress: builder.mutation<AddressDeleteResponse, number>({
      query: (id) => ({
        url: `api/user/address/${id}`,
        method: "DELETE",
      }),
    }),

    getPersonalInformation: builder.query<any, void>({
      query: () => ({
        url: "api/user",
        method: "GET",
      }),
    }),

    updatePersonalInformation: builder.mutation({
      query: ({ data, id }: { data: PersonalFormValues; id: number }) => ({
        url: `api/user/edit/profile/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: ({
        data,
      }: {
        data: { currentPassword: string; newPassword: string };
      }) => ({
        url: `api/user/edit/change-password`,
        method: "PUT",
        body: data,
      }),
    }),

    enableTwoFactorAuth: builder.mutation({
      query: ({ enable }: { enable: boolean }) => ({
        url: "api/user/two-factor-auth",
        method: "PATCH",
        body: { enable },
      }),
    }),

    getTwoFactorAuthStatus: builder.query<any, void>({
      query: () => ({
        url: "api/user/two-factor-status",
        method: "GET",
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
      query: ({ reason }: { reason: string }) => ({
        url: "api/support/deletion-request",
        method: "POST",
        body: { reason: reason },
      }),
    }),

    getAccountDeletionStatus: builder.query<any, void>({
      query: () => ({
        url: "api/support/account-deletion/status",
        method: "GET",
      }),
    }),

    raiseSupportTicket: builder.mutation({
      query: ({ formData }: { formData: FormData }) => ({
        url: "api/support/user/raise-ticket",
        method: "POST",
        body: formData,
      }),
    }),

    getOpenTicket: builder.query<any, void>({
      query: () => ({
        url: "api/support/user/my-tickets",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFilteredOrdersQuery,
  useGetOrdersByIdQuery,
  useGetReviewsQuery,
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
