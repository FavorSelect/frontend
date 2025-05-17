import Paragraph from "@/components/atoms/Paragraph";
import React from "react";

function AccountSettingHeader() {
  return (
    <div>
      <h2 className="text-xl font-bold text-scarlet-red mb-2">
        Account Setting
      </h2>
      <Paragraph className="text-gray-600 mb-6 text-sm">
        Update your preferences, password and security settings
      </Paragraph>
    </div>
  );
}

export default AccountSettingHeader;
