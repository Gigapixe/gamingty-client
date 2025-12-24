"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import CategorySliderSkeleton from "../skeletons/CategorySliderSkeleton";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

export default function CategorySliderUi({ values }: { values: Category[] }) {
  // Filter out the 'Cryptocurrency' category
  const filteredValues = values.filter(
    (item) => item.name !== "Cryptocurrency"
  );
  const swiperRef = useRef<import("swiper").Swiper | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Wait until categories are loaded and have at least 1 item
  useEffect(() => {
    if (filteredValues && filteredValues.length > 0) {
      setIsReady(true);
    }
  }, [filteredValues]);

  // Initialize Swiper and track slide position
  const handleSwiperInit = (swiper: any) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  // Navigate to previous slide
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Navigate to next slide
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (!isReady) {
    return <CategorySliderSkeleton />;
  }

  return (
    <div className="relative w-full container mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={8}
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        onSwiper={handleSwiperInit}
        loop={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        className="mySwiper"
      >
        {filteredValues.length > 0 ? (
          filteredValues.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={`/product-category/${item.slug}`}
                className="shrink-0 p-2"
              >
                <div className="group border border-white dark:border-white/10 dark:hover:border-primary/50 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl shadow flex flex-col lg:flex-row gap-2 lg:gap-4 items-center p-6 hover:shadow-lg transition-all duration-150 bg-background-light dark:bg-background-dark-2">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mb-2 rounded-full">
                      <span className="text-gray-500 text-sm">Img</span>
                    </div>
                  )}
                  <h2 className="text-sm font-medium text-center line-clamp-1 group-hover:text-primary dark:text-gray-200 dark:group-hover:text-primary transition-colors duration-200">
                    {/* translate category name client-side for UX */}
                    {item.name}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg">
              <p className="text-gray-500">No categories available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="swiper-pagination mt-4"></div>
      {/* Left Arrow */}
      {!isBeginning && filteredValues.length > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform rotate-180 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200"
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5888 1.11221L18.4275 8.95092L10.5888 16.7896M17.3388 8.95098L1.44356 8.95097"
              stroke="white"
              strokeWidth="1.4857"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
        </button>
      )}
      {/* Right Arrow */}
      {!isEnd && filteredValues.length > 0 && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200"
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5888 1.11221L18.4275 8.95092L10.5888 16.7896M17.3388 8.95098L1.44356 8.95097"
              stroke="white"
              strokeWidth="1.4857"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
