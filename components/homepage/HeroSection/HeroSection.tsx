"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import HeroSectionSkeleton from "./HeroSectionSkeleton";

import { Banner } from "@/types/banner";

interface SliderCarouselProps {
  banners?: Banner[];
}

export default function HeroSection({ banners = [] }: SliderCarouselProps) {
  const swiperRef = useRef<import("swiper").Swiper | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSwiperInit = (swiper: any) => {
    swiperRef.current = swiper;
  };
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

  // Wait until banners are loaded and have at least 1 item
  useEffect(() => {
    if (banners && banners.length > 0) {
      setIsReady(true);
    }
  }, [banners]);

  if (!isReady) {
    // Show skeleton with the expected count (or 3 as default)
    return <HeroSectionSkeleton />;
  }

  return (
    <div className="w-full container mx-auto py-8 relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        // onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={banners.length > 1}
        onSwiper={handleSwiperInit}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <Link
              href={
                banner.slug.startsWith("/") ? banner.slug : `/${banner.slug}`
              }
              className="glance-effect block w-full h-[365px] group relative overflow-hidden rounded-lg"
            >
              <Image
                src={banner.image}
                alt={banner.slug}
                height={2400}
                width={2400}
                className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <span className="glance-effect__light" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform rotate-180 -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md hover:bg-primary dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200"
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
          {/* Always show right arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-primary p-2 rounded-full shadow-md hover:bg-primary dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200"
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
        </>
      )}
    </div>
  );
}
