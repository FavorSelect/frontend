"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Paragraph from "@/components/atoms/Paragraph";
import { useVerifyTwoFactorMutation } from "@/store/api/userDashboardApi";

type OtpFormValues = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

const TwoFactorOtpVerificationForm = () => {
  const router = useRouter();
  const [verifyTwoFactor, { isLoading }] = useVerifyTwoFactorMutation();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>();

  const onSubmit = async (data: OtpFormValues) => {
    try {
      console.log("OTP Data Received:", data);
      const verificationCode = Object.values(data).join("");
      if (verificationCode.length !== 6) {
        toast.error("Please enter a 6-digit OTP.");
        return;
      }

      const response = await verifyTwoFactor({
        otp: verificationCode,
      }).unwrap();

      console.log("OTP Verification Response:", response);
      toast.success(response.message || "OTP verified successfully!");
      router.push("/login");
    } catch (error: unknown) {
      console.error("OTP verification failed:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(
          apiError.data.message || "Incorrect OTP. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-2">Verify OTP</h2>
      <Paragraph className="text-gray-600 text-sm mb-6">
        Enter the 6-digit code sent to your email. This code is valid for the
        next 10 minutes.
      </Paragraph>

      {/* OTP Inputs */}
      <div className="flex justify-between mb-8">
        {Array.from({ length: 6 }).map((_, index) => {
          const fieldName = `otp${index + 1}` as keyof OtpFormValues;
          return (
            <Input
              key={index}
              type="text"
              maxLength={1}
              {...register(fieldName, {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]$/,
                  message: "Must be a digit",
                },
              })}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" &&
                  !e.currentTarget.value &&
                  index > 0
                ) {
                  setFocus(`otp${index}` as keyof OtpFormValues);
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (value && index < 5) {
                  setFocus(`otp${index + 2}` as keyof OtpFormValues);
                }
              }}
              className={`w-10 h-12 text-center text-xl rounded-md bg-[#fff1f1] border border-rose-300 text-rose-600 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                errors[fieldName] ? "border-red-500" : ""
              }`}
            />
          );
        })}
      </div>

      <Button
        type="submit"
        disabled={isLoading || isSubmitting}
        className={`w-full max-w-full bg-scarlet-red text-white py-2 rounded-md transition duration-200 font-semibold mb-6 ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "hover:bg-scarlet-red-600"
        }`}
      >
        <ShieldCheck className="w-5 h-5" />
        {isLoading || isSubmitting ? "Verifying..." : "Verify"}
      </Button>

      <p className="text-gray-400 text-sm mb-2">
        Didn’t get the code?{" "}
        <Button className="text-black underline hover:text-rose-600">
          Resend code
        </Button>
      </p>

      <div className="flex justify-center gap-4 text-gray-500 text-xs mt-6">
        <Link href="#" className="">
          Need help?
        </Link>
        <span>|</span>
        <Link href="#" className="">
          Send feedback
        </Link>
      </div>
    </form>
  );
};

export default TwoFactorOtpVerificationForm;
