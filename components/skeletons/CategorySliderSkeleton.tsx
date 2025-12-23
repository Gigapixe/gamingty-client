import React from "react";

const CategorySliderSkeleton: React.FC = () => {
  return (
    <div className="relative w-full container mx-auto animate-pulse">
      <div className="flex gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center justify-center p-6 w-32 h-32 bg-gray-200 dark:bg-gray-800"
          >
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mb-2" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        ))}
      </div>
      <div className="swiper-pagination mt-4">
        <div className="h-2 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
      </div>
      {/* Left Arrow Skeleton */}
      <div className="absolute top-1/2 left-0 transform rotate-180 -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md" />
      {/* Right Arrow Skeleton */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md" />
    </div>
  );
};

export default CategorySliderSkeleton;
