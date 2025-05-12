import { apiSlice } from "./api";
import { FormValues } from "@/components/molecules/auth/SignupForm";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data: FormValues) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      { message: string; user?: any },
      { verificationCode: string }
    >({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation, useVerifyOtpMutation } =
  authApi;
