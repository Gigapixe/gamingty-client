"use client";
import CartIcon from "@/public/icons/CartIcon";
import HomeIcon from "@/public/icons/footer/HomeIcon";
import WishListIcon from "@/public/icons/footer/WishListIcon";
import Link from "next/link";
import CategoryToggleButton from "../header/CategoryToggleButton";
import { useEffect, useState } from "react";
import CartButton from "../header/CartButton";

const MobileFooter = () => {
  const [isVisible, setIsVisible] = useState(true); // Track footer visibility

  // Handle scroll to show/hide footer
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      setIsVisible(isScrollingUp || currentScrollY < 50); // Show when scrolling up or near top
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <footer
        className={`lg:hidden fixed z-20 bottom-0 bg-emerald-500 flex items-center justify-between w-full py-2 px-3 md:px-10 dark:bg-emerald-600 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link
          href="/"
          className="text-xl text-white flex flex-col items-center"
          rel="noreferrer"
          aria-label="Home"
        >
          <HomeIcon />
          <h1>Home</h1>
        </Link>
        <CategoryToggleButton />
        <CartButton />
        <Link
          href="/user/wishlist"
          className="text-xl text-white flex flex-col items-center"
          rel="noreferrer"
          aria-label="Wishlist"
        >
          <WishListIcon fill="white" />
          <h1>WishList</h1>
        </Link>
      </footer>
    </>
  );
};

export default MobileFooter;
