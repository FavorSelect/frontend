import { FC } from "react";

const SkeletonProductCard: FC = () => {
  return (
    <div className="flex flex-col justify-between h-full space-y-2 font-montserrat bg-white p-2 rounded-lg shadow-sm">
      {/* Image Placeholder */}
      <div className="relative h-48 rounded-lg border border-white bg-gray-100 flex flex-col justify-start items-center overflow-hidden">
        <div className="flex justify-between items-center w-full px-2 py-2">
          <div className=" h-5 w-12 bg-gray-300 rounded shimmer" />
          <div className=" h-8 w-8 bg-gray-300 rounded-full shadow shimmer"></div>
        </div>
        <div className="h-28 w-28 bg-gray-300 rounded shimmer self-center" />
      </div>

      {/* Title Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 shimmer" />

      {/* Price + Rating */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-20 bg-gray-300 rounded shimmer" />
        <div className="flex gap-x-1">
          <div className="h-4 w-4 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-6 bg-gray-300 rounded shimmer" />
        </div>
      </div>

      {/* Tags Placeholder */}
      <div className="flex gap-2 flex-wrap">
        <div className="h-5 w-16 bg-gray-200 rounded-full shimmer" />
        <div className="h-5 w-16 bg-gray-200 rounded-full shimmer" />
      </div>

      {/* Buttons Placeholder */}
      <div className="space-y-2.5">
        <div className="h-8 w-full bg-gray-300 rounded shimmer" />
        <div className="h-8 w-full bg-gray-400 rounded shimmer" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
