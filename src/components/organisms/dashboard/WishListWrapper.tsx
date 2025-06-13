"use client";
import React from "react";
import MyWishList from "@/components/molecules/dashboard/MyWishList";

const WishListWrapper = ({ token }: { token: string }) => {
  return <MyWishList token={token} />;
};

export default WishListWrapper;
