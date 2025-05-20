import React from "react";
import SetPasswordForm from "@/components/molecules/auth/SetPasswordForm";
import FormHeader from "@/components/molecules/auth/FormHeader";
import FormText from "@/components/molecules/auth/FormText";

const SetPasswordWrapper = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <FormHeader>Reset password</FormHeader>
      <FormText>Please enter your new password below</FormText>
      <SetPasswordForm />
    </div>
  );
};

export default SetPasswordWrapper;
