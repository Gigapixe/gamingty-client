"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import ArrowIcon from "@/public/icons/ArrowIcon";

const NavLinks = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/bestseller", label: "Bestsellers" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <>
      {/* Desktop (lg and up) → Inline Links */}
      <div className="flex items-center gap-5 xl:gap-10 font-semibold">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-white hover:text-gray-300 transition-colors duration-150 font-light"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavLinks;
