import { FC } from "react";

const SkeletonCartItem: FC = () => {
  return (
    <div className="flex items-center gap-3 py-4 px-3 rounded-lg border border-gray-200 animate-pulse">
      {/* Checkbox placeholder */}
      <div className="h-5 w-5 bg-gray-300 rounded shimmer" />

      {/* Image placeholder */}
      <div className="w-[70px] h-[70px] bg-gray-300 rounded-md border border-gray-200 shimmer" />

      {/* Text content placeholder */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 rounded shimmer" />
        <div className="h-3 w-1/2 bg-gray-300 rounded shimmer" />
      </div>

      {/* Price, quantity, and remove placeholders */}
      <div className="flex gap-x-3 items-center">
        <div className="h-5 w-16 bg-gray-300 rounded shimmer" />
        <div className="h-8 w-20 bg-gray-300 rounded shimmer" />
        <div className="h-8 w-8 bg-gray-300 rounded-full shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCartItem;
