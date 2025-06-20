import React from "react";

const SkeletonProductDetailsSidebar: React.FC = () => {
  return (
    <div className="basis-2/5 flex flex-col space-y-4 md:space-y-6 rounded-lg px-4">
      {/* Tags */}
      <div className="flex flex-col xs:flex-row gap-3 xs:gap-2">
        <div className="w-24 h-6 bg-gray-300 rounded shimmer" />
        <div className="w-28 h-6 bg-gray-300 rounded shimmer" />
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-300 rounded shimmer" />

      {/* Subtext / Recommendation */}
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 bg-gray-300 rounded shimmer" />
        <div className="w-40 h-4 bg-gray-300 rounded shimmer" />
      </div>

      {/* Rating */}
      <div className="w-24 h-5 bg-gray-300 rounded shimmer" />

      {/* Price */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-16 h-5 bg-gray-300 rounded shimmer" />
        <div className="w-20 h-6 bg-gray-300 rounded shimmer" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-300 rounded shimmer" />
        <div className="w-5/6 h-4 bg-gray-300 rounded shimmer" />
        <div className="w-4/6 h-4 bg-gray-300 rounded shimmer" />
      </div>

      {/* Color Selector */}
      <div className="space-y-2">
        <div className="w-32 h-4 bg-gray-300 rounded shimmer" />
        <div className="flex gap-2">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-gray-300 shimmer"
              />
            ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="space-y-2">
        <div className="w-28 h-4 bg-gray-300 rounded shimmer" />
        <div className="flex flex-wrap gap-2">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="w-12 h-8 bg-gray-300 rounded shimmer" />
            ))}
        </div>
        <div className="w-20 h-4 bg-gray-200 rounded shimmer mt-1" />
      </div>

      {/* Quantity Selector */}
      <div className="w-28 sm:w-24 h-9 flex rounded-md overflow-hidden">
        <div className="w-1/3 h-full bg-gray-300 shimmer" />
        <div className="w-1/3 h-full bg-gray-300 shimmer" />
        <div className="w-1/3 h-full bg-gray-300 shimmer" />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-3">
        <div className="h-10 w-full bg-gray-300 rounded shimmer" />
        <div className="h-10 w-full bg-gray-400 rounded shimmer" />
      </div>
    </div>
  );
};

export default SkeletonProductDetailsSidebar;
