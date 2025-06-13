"use client";
import React from "react";
import MyReviews from "@/components/molecules/dashboard/MyReviews";

const ReviewsWrapper = ({ token }: { token: string }) => {
  return <MyReviews token={token} />;
};

export default ReviewsWrapper;
