import CartOrderSuccessWrappeer from "@/components/organisms/cart-order-success/CartOrderSuccessWrappeer";
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

  return <CartOrderSuccessWrappeer sessionId={session_id} />;
}
