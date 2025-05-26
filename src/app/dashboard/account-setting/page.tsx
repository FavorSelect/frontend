import React from "react";
import AccountSettingWrapper from "@/components/organisms/dashboard/AccountSettingWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <AccountSettingWrapper token={token} />;
}
