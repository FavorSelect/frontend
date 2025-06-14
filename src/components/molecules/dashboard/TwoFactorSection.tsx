import React from "react";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import {
  useEnableTwoFactorAuthMutation,
  useGetTwoFactorAuthStatusQuery,
} from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";

const TwoFactorSection = ({ token }: { token: string }) => {
  const [enableTwoFactorAuth, { isLoading }] = useEnableTwoFactorAuthMutation();
  const { data, refetch } = useGetTwoFactorAuthStatusQuery({ token });

  const isTwoFactorEnabled = data?.isTwoFactorAuthEnable ?? false;

  const handleToggle = async () => {
    const newStatus = !isTwoFactorEnabled;
    try {
      const response = await enableTwoFactorAuth({
        enable: newStatus,
        token,
      }).unwrap();

      toast.success(response.message || "2FA status updated.", {
        duration: 3000,
      });
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        toast.error(err.message || "Failed to update 2FA.");
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold text-gray-800">
          Two-Factor Authentication
        </h4>
        <Button
          onClick={handleToggle}
          disabled={isLoading}
          className="px-6 py-2 rounded-md text-sm transition border border-scarlet-red text-scarlet-red hover:bg-red-50 font-semibold flex items-center gap-2"
        >
          {isLoading && <Spinner />}
          {isLoading
            ? isTwoFactorEnabled
              ? "Disabling..."
              : "Enabling..."
            : isTwoFactorEnabled
            ? "Disable 2FA"
            : "Enable 2FA"}
        </Button>
      </div>
      <Paragraph className="text-gray-500 text-sm">
        {isTwoFactorEnabled
          ? "Enabled – Your account is protected with 2FA."
          : "Not enabled – Add extra protection to your account."}
      </Paragraph>
    </div>
  );
};

export default TwoFactorSection;
