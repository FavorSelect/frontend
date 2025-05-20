import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-screen h-dvh flex flex-col items-center justify-center bg-light-gray backdrop-blur-md fixed inset-0 z-[9999]">
      <div className="border-4 border-t-scarlet-red border-gray-300 rounded-full w-10 h-10 animate-spin"></div>
    </div>
  );
};

export default Loader;
