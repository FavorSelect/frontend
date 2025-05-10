import { apiSlice } from "./api";
import { FormValues } from "@/components/molecules/auth/SignupForm";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data: FormValues) => ({
        url: "api/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/api/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otp: string) => ({
        url: "api/verify-otp",
        method: "POST",
        body: { otp },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation, useVerifyOtpMutation } =
  authApi;
