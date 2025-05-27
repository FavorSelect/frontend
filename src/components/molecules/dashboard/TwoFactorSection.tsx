/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import { useEnableTwoFactorAuthMutation } from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTwoFactorStatus } from "@/store/slices/user/userSlice";

const TwoFactorSection = ({ token }: { token: string }) => {
  const dispatch = useDispatch();
  const isTwoFactorEnabled = useSelector(
    (state: RootState) => state.user.isTwoFactorEnabled
  );
  const [enableTwoFactorAuth, { isLoading }] = useEnableTwoFactorAuthMutation();

  const handleToggle = async () => {
    try {
      const response = await enableTwoFactorAuth({
        enable: !isTwoFactorEnabled,
        token,
      }).unwrap();

      dispatch(setTwoFactorStatus(!isTwoFactorEnabled));
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
          onClick={handleToggle}
          disabled={isLoading}
          className={`px-6 py-2 rounded-md text-sm transition border font-semibold ${
            isTwoFactorEnabled
              ? "border-gray-400 text-gray-700 hover:bg-gray-100"
              : "border-scarlet-red text-scarlet-red hover:bg-red-50"
          }`}
        >
          {isLoading
            ? isTwoFactorEnabled
              ? "Disabling..."
              : "Enabling..."
            : isTwoFactorEnabled
            ? "Disable"
            : "Enable"}
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
