"use client";
import React from "react";
import AddShippingAddress from "@/components/molecules/dashboard/AddShippingAddress";

const ShippingAddressWrapper = ({ token }: { token: string }) => {
  return <AddShippingAddress token={token} />;
};

export default ShippingAddressWrapper;
