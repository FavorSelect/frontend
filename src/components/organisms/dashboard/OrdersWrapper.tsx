"use client";
import MyOrders from "@/components/molecules/dashboard/MyOrders";
import React from "react";

const OrdersWrapper = ({ token }: { token: string }) => {
  return <MyOrders token={token} />;
};

export default OrdersWrapper;
