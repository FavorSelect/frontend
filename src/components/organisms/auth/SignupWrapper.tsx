"use client";
import React from "react";
import { Facebook, Google, X } from "@/assets/icon";
import { Button } from "@/components/atoms/Button";
import SignupForm from "@/components/molecules/auth/SignupForm";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const SignupWrapper = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-left">Create an account</h1>
      <p className="text-left text-sm text-gray-600 mb-6">
        Already have an account?{" "}
        <Link href="/login" className="text-red-500 font-medium">
          Log in
        </Link>
      </p>

      <SignupForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Quick Login</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-1.5 text-base
        "
        >
          <Google /> Google
        </Button>
        <Button
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-1.5 text-base
        "
        >
          <Facebook className="text-[#087aea]" /> Facebook
        </Button>
        <Button
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-1.5 text-base
        "
        >
          <X /> Twitter
        </Button>
      </div>

      <p className="flex justify-center items-center text-xs text-gray-500 mt-4">
        Location: <span className="font-semibold text-[#333333]">Turkey</span>
        <ChevronDown className="w-4 h-4 cursor-pointer" />
      </p>
    </div>
  );
};

export default SignupWrapper;
