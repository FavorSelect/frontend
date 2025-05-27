import React from "react";

const SkeletonDeleteAccount = () => {
  return (
    <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="h-5 w-40 bg-gray-300 rounded shimmer" />
      <div className="h-4 w-3/4 bg-gray-300 rounded shimmer" />
      <div className="h-4 w-1/2 bg-gray-300 rounded shimmer" />
      <div className="h-10 w-full bg-gray-200 rounded shimmer" />
      <div className="h-10 w-40 bg-gray-300 rounded shimmer" />
      <div className="h-20 w-full bg-gray-100 rounded shimmer" />
    </div>
  );
};

export default SkeletonDeleteAccount;
