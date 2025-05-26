/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import { useEnableTwoFactorAuthMutation } from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";

const TwoFactorSection = ({ token }: { token: string }) => {
  const [enableTwoFactorAuth, { isLoading }] = useEnableTwoFactorAuthMutation();

  const handleEnable = async () => {
    try {
      const response = await enableTwoFactorAuth({
        enable: true,
        token,
      }).unwrap();
      console.log(response);
      toast.success(response.message || "2FA status updated.");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update 2FA.");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold text-gray-800">
          Two-Factor Authentication
        </h4>
        <Button
          onClick={handleEnable}
          disabled={isLoading}
          className="px-6 py-2 rounded-md text-sm transition border border-scarlet-red text-scarlet-red hover:bg-red-50 font-semibold"
        >
          {isLoading ? "Enabling..." : "Enable"}
        </Button>
      </div>
      <Paragraph className="text-gray-500 text-sm">
        Not enabled – Add extra protection to your account.
      </Paragraph>
    </div>
  );
};

export default TwoFactorSection;
