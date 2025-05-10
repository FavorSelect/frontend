"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type OtpFormValues = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

const PasswordResetOtpForm = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<OtpFormValues>();

  const onSubmit = (data: OtpFormValues) => {
    // Combine the OTP values
    const otp = Object.values(data).join("");
    console.log("Entered OTP:", otp);

    // Simulate successful submission
    toast.success(`OTP entered: ${otp}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-2">Reset your password</h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter the 6-digit code sent to your email. This code is valid for the
        next 10 minutes.
      </p>

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
                onChange: (e) => {
                  const value = e.target.value;

                  // Automatically move focus to the next input
                  if (value && index < 5) {
                    setFocus(`otp${index + 2}` as keyof OtpFormValues);
                  }
                },
              })}
              className={`w-10 h-12 text-center text-xl rounded-md bg-[#fff1f1] border border-rose-300 text-rose-600 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                errors[fieldName] ? "border-red-500" : ""
              }`}
            />
          );
        })}
      </div>

      {/* Reset Password Button */}
      <Button
        type="submit"
        className="w-full max-w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold mb-6"
      >
        <Lock className="w-5 h-5" />
        Reset password
      </Button>

      {/* Resend Code Link */}
      <p className="text-gray-400 text-sm mb-2">
        Didn’t get the code?{" "}
        <Button className="text-black underline hover:text-rose-600">
          Resend code
        </Button>
      </p>

      {/* Footer Links */}
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

export default PasswordResetOtpForm;
