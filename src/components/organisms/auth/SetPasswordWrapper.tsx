import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SetPasswordForm from "@/components/molecules/auth/SetPasswordForm";
import FormHeader from "@/components/molecules/auth/FormHeader";
import FormText from "@/components/molecules/auth/FormText";
import toast from "react-hot-toast";

type SetPasswordWrapperProps = {
  token: string;
};

const SetPasswordWrapper = ({ token }: SetPasswordWrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    const expirationTime = 10 * 60 * 1000;
    const timeout = setTimeout(() => {
      toast.error(
        "Your password reset link has expired. Please request a new one."
      );
      router.push("/password-reset");
    }, expirationTime);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <FormHeader>Reset password</FormHeader>
      <FormText>Please enter your new password below</FormText>
      <SetPasswordForm resetToken={token} />
    </div>
  );
};

export default SetPasswordWrapper;
