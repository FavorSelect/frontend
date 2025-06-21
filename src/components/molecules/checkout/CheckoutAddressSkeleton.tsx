import React from "react";

const CheckoutAddressSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 text-sm w-full">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded shimmer" />
            <div className="h-4 w-1/3 bg-gray-300 rounded shimmer" />
          </div>
          <div className="h-3 w-1/2 bg-gray-300 rounded shimmer" />
          <div className="h-3 w-1/3 bg-gray-300 rounded shimmer" />
          <div className="h-3 w-1/4 bg-gray-300 rounded shimmer" />
          <div className="h-3 w-1/2 bg-gray-300 rounded shimmer" />
        </div>
        <div className="h-5 w-16 bg-gray-200 rounded shimmer" />
      </div>
    </div>
  );
};

export default CheckoutAddressSkeleton;
