import React from "react";

const SkeletonProductImageGallery: React.FC = () => {
  const fakeThumbnails = Array(4).fill(null);
  const fakeSlides = Array(3).fill(null);

  return (
    <div className="flex flex-row items-start gap-2 max-w-5xl mx-auto h-auto md:h-[600px] overflow-hidden">
      {/* Thumbnails - hidden on mobile */}
      <div className="min-w-[80px] h-[80%] hidden md:block">
        <div className="relative h-full overflow-hidden">
          <div className="block h-full select-none">
            {fakeThumbnails.map((_, index) => (
              <div
                key={index}
                className="mb-2 rounded overflow-hidden bg-gray-200 shimmer"
                style={{ height: 80, width: 80 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main carousel skeleton */}
      <div className="pl-0 md:pl-2 flex-grow relative">
        {/* Fake arrows */}
        <div className="absolute inset-y-0 left-0 z-10 hidden md:flex items-center">
          <div className="w-9 h-9 rounded-full bg-gray-200 shimmer" />
        </div>
        <div className="absolute inset-y-0 right-0 z-10 hidden md:flex items-center">
          <div className="w-9 h-9 rounded-full bg-gray-200 shimmer" />
        </div>

        <div className="relative h-full overflow-hidden">
          <div className="flex h-full select-none">
            {fakeSlides.map((_, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] h-[200px] sm:h-[300px] md:h-auto flex justify-center items-center"
              >
                <div className="w-full h-full md:h-[600px] bg-gray-200 shimmer rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductImageGallery;
