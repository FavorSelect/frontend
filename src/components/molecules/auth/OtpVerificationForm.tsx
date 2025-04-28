"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Link from "next/link";
import { useRef } from "react";

const OtpVerificationForm = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h2 className=" text-2xl font-semibold mb-2">Reset your password</h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-6">
        Enter the 6-digit code sent to your email. This code is valid for the
        next 10 minutes.
      </p>

      {/* OTP Input */}
      <div className="flex justify-between mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 text-center text-xl rounded-md bg-[#fff1f1] border border-rose-300 text-rose-600 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        ))}
      </div>

      {/* Reset Password Button */}
      <Button className="w-full max-w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold mb-6">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v2a2 2 0 002 2h2a2 2 0 002-2v-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 11v2a5 5 0 01-5 5H7a5 5 0 01-5-5v-2"
          />
        </svg>
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
    </div>
  );
};

export default OtpVerificationForm;
