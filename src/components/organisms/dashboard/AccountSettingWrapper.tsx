"use client";
import AccountSettingHeader from "@/components/molecules/dashboard/AccountSettingHeader";
import DeleteAccount from "@/components/molecules/dashboard/DeleteAccount";
import EmailPreferences from "@/components/molecules/dashboard/EmailPreferences";
import SecuritySection from "@/components/molecules/dashboard/SecuritySection";
import React from "react";

const AccountSettingWrapper = () => {
  return (
    <div className="space-y-6">
      <AccountSettingHeader />
      <SecuritySection />
      <EmailPreferences />
      <DeleteAccount />
    </div>
  );
};

export default AccountSettingWrapper;
