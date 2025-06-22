import { FC } from "react";

const SkeletonOrderSummary: FC = () => {
  return (
    <div className="py-3 px-4 rounded-lg border border-gray-200 w-full animate-pulse">
      {/* Heading */}
      <div className="h-5 w-1/3 bg-gray-300 rounded mb-4 shimmer" />

      {/* Summary Rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex justify-between mb-2">
          <div className="h-4 w-20 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-12 bg-gray-300 rounded shimmer" />
        </div>
      ))}

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mb-4 border-t border-gray-200 pt-3">
        <div className="h-5 w-16 bg-gray-300 rounded shimmer" />
        <div className="h-5 w-20 bg-gray-300 rounded shimmer" />
      </div>

      {/* Promo Code Input */}
      <div className="h-10 w-full bg-gray-300 rounded shimmer mb-4" />

      {/* Checkout Button */}
      <div className="h-12 w-full bg-gray-400 rounded shimmer mb-5" />

      {/* Payment Icons Section */}
      <div className="mb-2 h-5 w-1/3 bg-gray-300 rounded shimmer" />
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-9 h-6 bg-gray-300 rounded shimmer" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonOrderSummary;
