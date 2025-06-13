import Image from "next/image";
import React from "react";
import { UserCardSkeleton as MyReviewCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";
import { useGetReviewsQuery } from "@/store/api/userDashboardApi";

const MyReviews = ({ token }: { token: string }) => {
  const { data, isLoading, isFetching } = useGetReviewsQuery(token);

  if (isLoading || isFetching) {
    return <MyReviewCardSkeleton />;
  }

  if (!data || !data.reviews) {
    return <p>No reviews found.</p>;
  }

  const { reviews, totalReviews } = data;

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-bold text-scarlet-red mb-2">My Reviews</h2>
      <p className="mb-6 text-gray-600">Total Reviews: {totalReviews}</p>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-[#eeeeee] rounded-lg p-4 bg-white"
          >
            <div className="flex gap-4 items-center">
              <Image
                src={review.product.coverImageUrl}
                alt={review.product.productName}
                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                width={80}
                height={80}
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {review.product.productName}
                </h3>
                <div className="flex items-center text-yellow-500 my-1">
                  {"★".repeat(Math.floor(review.rating))}
                  {"☆".repeat(5 - Math.floor(review.rating))}
                  <span className="ml-2 text-sm text-scarlet-red">
                    ({review.rating})
                  </span>
                </div>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
