import React from "react";

const CategorySliderSkeleton: React.FC = () => {
  return (
    <div className="relative w-full container mx-auto animate-pulse py-6">
      {/* Responsive grid: 2 cards on mobile, 3 on md, 4 on lg */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow border border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-2 lg:gap-4 items-center p-6 bg-gray-200 dark:bg-gray-800"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
            <div className="flex-1 lg:ml-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto lg:mx-0"></div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="swiper-pagination mt-4">
        <div className="h-2 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
      </div> */}
      {/* Left Arrow Skeleton */}
      <div className="absolute top-1/2 left-0 transform rotate-180 -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md w-9 h-9" />
      {/* Right Arrow Skeleton */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md w-9 h-9" />
    </div>
  );
};

export default CategorySliderSkeleton;
