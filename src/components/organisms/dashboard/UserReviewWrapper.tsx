"use client";
import ReviewForm from "@/components/molecules/global/ReviewForm";
import { useAddReviewMutation } from "@/store/api/productDetailsApi";
import React from "react";

const UserReviewWrapper = ({ id }: { id: string }) => {
  const [addReview] = useAddReviewMutation();

  return <ReviewForm productId={id} addReviewMutation={[addReview]} />;
};

export default UserReviewWrapper;
