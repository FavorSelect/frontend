import { FC } from "react";

const SkeletonCartHeader: FC = () => {
  return (
    <div className="flex items-center justify-between mb-4 animate-pulse">
      {/* Select All Placeholder */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-300 rounded shimmer" /> {/* Checkbox */}
        <div className="h-4 w-20 bg-gray-300 rounded shimmer" /> {/* Label */}
      </div>

      {/* Delete All Button Placeholder */}
      <div className="h-9 w-28 bg-gray-400 rounded shimmer" />
    </div>
  );
};

export default SkeletonCartHeader;
