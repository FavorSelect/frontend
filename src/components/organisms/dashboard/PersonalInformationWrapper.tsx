"use client";
import React from "react";
import PersonalInformation from "@/components/molecules/dashboard/PersonalInformation";

const PersonalInformationWrapper = ({ token }: { token: string }) => {
  return <PersonalInformation token={token} />;
};

export default PersonalInformationWrapper;
