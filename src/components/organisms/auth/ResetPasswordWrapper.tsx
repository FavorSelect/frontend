import React from "react";
import ResetPasswordForm from "@/components/molecules/auth/ResetPasswordForm";

const ResetPasswordWrapper = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-left">Reset password</h1>
      <p className="text-left text-sm text-gray-600 mb-6">
        Enter your email, and we’ll email you a link to reset your password.
      </p>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordWrapper;
