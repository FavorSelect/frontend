import React from "react";
import ResetPasswordForm from "@/components/molecules/auth/ResetPasswordForm";
import FormHeader from "@/components/molecules/auth/FormHeader";
import FormText from "@/components/molecules/auth/FormText";

const ResetPasswordWrapper = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <FormHeader>Reset password</FormHeader>
      <FormText>
        Enter your email, and we’ll email you a link to reset your password.
      </FormText>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordWrapper;
