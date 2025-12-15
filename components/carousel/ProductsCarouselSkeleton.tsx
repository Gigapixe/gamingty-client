export default function ProductsCarouselSkeleton() {
  return (
    <div className="w-full container mx-auto py-8 relative">
      <div className="flex gap-4">
        {/* Always show first two skeletons */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        {/* Show third and fourth on md and up */}
        <div className="hidden md:block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        <div className="hidden md:block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        {/* Show 5-7 on xl and up */}
        <div className="hidden xl:block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        <div className="hidden xl:block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
        <div className="hidden xl:block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[270px] w-[164.56px]" />
      </div>
    </div>
  );
}
