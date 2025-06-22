import { FC } from "react";

const SkeletonOrderPlaced: FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      {/* Heading Skeleton */}
      <div className="h-6 w-1/2 mx-auto bg-gray-300 rounded shimmer" />

      {/* Order Details Skeleton */}
      <div className="space-y-2 text-sm md:text-base text-gray-700">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-4 w-3/4 bg-gray-300 rounded shimmer" />
        ))}
      </div>

      <hr className="my-4 h-0.5 border-0 bg-gray-200" />

      {/* Product Details Skeleton */}
      <div className="flex gap-4 items-center">
        {/* Image Placeholder */}
        <div className="w-20 h-20 bg-gray-300 rounded shimmer" />

        {/* Text Details */}
        <div className="flex flex-col gap-2 text-sm text-gray-800 w-full">
          <div className="h-4 w-1/2 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-1/4 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-3/5 bg-gray-300 rounded shimmer" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonOrderPlaced;
