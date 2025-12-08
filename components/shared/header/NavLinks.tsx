"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import ArrowIcon from "@/public/icons/ArrowIcon";

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Bestsellers" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  // Close dropdown if click happens outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop (lg and up) → Inline Links */}
      <div className="hidden lg:flex items-center gap-5 lg:gap-10 font-semibold">
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

      {/* Mobile/Tablet (md and below) → Dropdown */}
      <div
        className="relative lg:hidden bg-secondary/10 hover:bg-secondary/20 py-4 lg:px-4 px-2 cursor-pointer "
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Trigger */}
        <button className="flex items-center justify-between w-full font-light gap-2 lg:gap-4 text-white">
          explore
          <ArrowIcon
            className={`w-4 h-4 transition-transform ${
              isOpen ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-[50px] left-0 mt-2 w-40 bg-background-light dark:bg-background-dark rounded-md shadow-md z-50 border border-border-light dark:border-border-dark">
            <ul className="flex flex-col">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-4 py-2 hover:bg-primary/10 transition-colors"
                    onClick={() => setIsOpen(false)} // close on click
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default NavLinks;
