import { FC } from "react";

const SkeletonCartTitle: FC = () => {
  return (
    <div className="border-b border-b-gray-200 mb-4 pb-2 flex gap-x-2 items-center animate-pulse">
      {/* Title Placeholder */}
      <div className="h-5 w-24 bg-gray-300 rounded shimmer" />

      {/* Icon Placeholder */}
      <div className="h-5 w-5 bg-gray-300 rounded shimmer" />
    </div>
  );
};

export default SkeletonCartTitle;
