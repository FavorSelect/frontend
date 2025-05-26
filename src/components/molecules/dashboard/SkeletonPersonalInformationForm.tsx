import React from "react";

const SkeletonInput = () => (
  <div className="h-10 w-full bg-gray-200 rounded shimmer" />
);

const SkeletonLabel = () => (
  <div className="h-4 w-24 bg-gray-300 rounded shimmer mb-1" />
);

const SkeletonPersonalForm = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="h-6 w-40 bg-gray-300 rounded shimmer mb-4" />

      {/* Row 1: First & Last Name */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
      </div>

      {/* Row 2: Phone & Email */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
      </div>

      {/* Row 3: City */}
      <div className="space-y-2">
        <SkeletonLabel />
        <SkeletonInput />
      </div>

      {/* Row 4: State & Zip Code */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
        <div className="flex-1 space-y-2">
          <SkeletonLabel />
          <SkeletonInput />
        </div>
      </div>

      {/* Row 5: Country */}
      <div className="space-y-2">
        <SkeletonLabel />
        <SkeletonInput />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <div className="h-10 w-36 bg-gray-300 rounded shimmer" />
      </div>
    </div>
  );
};

export default SkeletonPersonalForm;
