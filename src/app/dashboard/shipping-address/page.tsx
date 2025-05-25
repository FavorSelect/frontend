import React from "react";
import ShippingAddressWrapper from "@/components/organisms/dashboard/ShippingAddressWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <ShippingAddressWrapper token={token} />;
}
