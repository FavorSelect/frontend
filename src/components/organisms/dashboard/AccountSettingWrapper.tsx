"use client";
import AccountSettingHeader from "@/components/molecules/dashboard/AccountSettingHeader";
import DeleteAccount from "@/components/molecules/dashboard/DeleteAccount";
import EmailPreferences from "@/components/molecules/dashboard/EmailPreferences";
import SecuritySection from "@/components/molecules/dashboard/SecuritySection";
import React from "react";

const AccountSettingWrapper = ({ token }: { token: string }) => {
  return (
    <div className="space-y-6">
      <AccountSettingHeader />
      <SecuritySection token={token} />
      <EmailPreferences />
      <DeleteAccount token={token} />
    </div>
  );
};

export default AccountSettingWrapper;
