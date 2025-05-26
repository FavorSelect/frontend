import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import TwoFactorSection from "./TwoFactorSection";
import { Button } from "@/components/atoms/Button";

const SecuritySection = ({ token }: { token: string }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Security</h3>
      {/* Password Section */}
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-base font-semibold text-gray-800">Password</h4>
          <Button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="px-6 py-2 rounded-md text-sm transition border border-scarlet-red text-scarlet-red hover:bg-red-50 font-semibold"
          >
            {showChangePassword ? "Cancel" : "Change"}
          </Button>
        </div>

        {showChangePassword && <ChangePasswordForm token={token} />}
      </div>

      {/* Two-Factor Section */}
      <TwoFactorSection token={token} />
    </div>
  );
};

export default SecuritySection;
