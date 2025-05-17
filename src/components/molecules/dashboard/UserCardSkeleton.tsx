import React from "react";

export const UserCardSkeleton = ({ reviewCard }: { reviewCard?: boolean }) => {
  return (
    <div className="border border-gray-200 bg-gray-100 rounded-lg p-4 mb-2 animate-pulse">
      <div className="flex justify-between mb-4 bg-gray-200 rounded-lg h-10"></div>
      <div className="flex">
        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4"></div>
        <div className="flex-grow">
          <div className="h-6 bg-gray-300 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-lg mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded-lg w-1/3"></div>
        </div>
        {!reviewCard && (
          <div className="flex flex-col space-y-3.5 ml-4">
            <div className="w-28 h-10 bg-gray-300 rounded-lg"></div>
            <div className="w-28 h-10 bg-gray-300 rounded-lg"></div>
          </div>
        )}
      </div>
    </div>
  );
};
