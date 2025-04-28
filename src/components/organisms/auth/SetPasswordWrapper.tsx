import React from "react";
import SetPasswordForm from "@/components/molecules/auth/SetPasswordForm";

const SetPasswordWrapper = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-left">Reset password</h2>
      <p className="text-left text-sm text-gray-600 mb-6">
        Please enter your new password below
      </p>
      <SetPasswordForm />
    </div>
  );
};

export default SetPasswordWrapper;
