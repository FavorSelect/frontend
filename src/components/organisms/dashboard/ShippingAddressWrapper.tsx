import React from "react";
import AddAddress from "@/components/molecules/dashboard/AddAddress";

const ShippingAddressWrapper = ({ token }: { token: string }) => {
  return <AddAddress token={token} />;
};

export default ShippingAddressWrapper;
