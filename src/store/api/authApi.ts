/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";
import { FormValues } from "@/components/molecules/auth/SignupForm";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data: FormValues) => ({
        url: "api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "api/auth/signin",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      { message: string; user?: any },
      { verificationCode: string }
    >({
      query: (data) => ({
        url: "api/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    findMyAccount: builder.mutation({
      query: (data: { email: string }) => ({
        url: "api/auth/find-my-account",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useFindMyAccountMutation,
} = authApi;
