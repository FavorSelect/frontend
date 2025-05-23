"use client";
import React from "react";
import { Facebook, Google, X } from "@/assets/icon";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";
import LoginForm from "@/components/molecules/auth/LoginForm";
import FormHeader from "@/components/molecules/auth/FormHeader";
import FormText from "@/components/molecules/auth/FormText";

const LoginWrapper = () => {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };
  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook`;
  };
  const handletwitterLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/twitter`;
  };

  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <FormHeader> Log in to your account</FormHeader>
      <FormText linkHref="/signup" linkText="Create an account">
        Don&apos;t have an account?
      </FormText>
      <LoginForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-xs sm:text-sm md:text-base text-gray-600">
            Quick Login
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm lg:text-base 
                    hover:bg-light-gray hover:border-scarlet-red transition-all duration-200"
        >
          <Google /> Google
        </Button>

        <Button
          type="button"
          onClick={handleFacebookLogin}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm lg:text-base 
                    hover:bg-light-gray hover:border-scarlet-red transition-all duration-200"
        >
          <Facebook className="text-[#087aea]" /> Facebook
        </Button>

        <Button
          type="button"
          onClick={handletwitterLogin}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm lg:text-base 
                    hover:bg-light-gray hover:border-scarlet-red transition-all duration-200"
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

export default LoginWrapper;
