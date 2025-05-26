import React from "react";
import PersonalInformationWrapper from "@/components/organisms/dashboard/PersonalInformationWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <PersonalInformationWrapper token={token} />;
}
