import React from "react";

interface SkeletonTabsProps {
  tabCount?: number;
  activeIndex?: number;
  className?: string;
}

const SkeletonTabs: React.FC<SkeletonTabsProps> = ({
  tabCount = 3,
  activeIndex = 0,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Tab Headers */}
      <div className="flex gap-3" role="tablist">
        {Array.from({ length: tabCount }).map((_, index) => (
          <div
            key={index}
            className={`py-2 px-4 border-b-2 border-transparent bg-gray-200 w-20 rounded-sm shimmer `}
            role="tab"
            aria-selected={index === activeIndex}
          />
        ))}
      </div>

      {/* Tab Panel */}
      <div role="tabpanel" className="space-y-3 mt-4">
        <div className="w-full h-4 bg-gray-300 rounded shimmer" />
        <div className="w-3/4 h-4 bg-gray-300 rounded shimmer" />
        <div className="w-5/6 h-4 bg-gray-300 rounded shimmer" />
      </div>
    </div>
  );
};

export default SkeletonTabs;
