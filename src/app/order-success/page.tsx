import PlaceOrder from "@/components/organisms/order-success/PlaceOrder";
import React from "react";

interface ResolvedSearchParams {
  session_id: string;
}

type SearchParams = Promise<ResolvedSearchParams>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;

  return <PlaceOrder sessionId={session_id} />;
}
