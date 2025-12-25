"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import MenuIcon from "./../../../public/icons/navbar/MenuIcon";
import CloseIcon from "./../../../public/icons/navbar/CloseIcon";
import { useThemeStore } from "@/zustand/store";
import ThemeToggle from "@/lib/ThemeToggle";

interface Props {
  userInfo?: boolean;
  unreadCount?: number;
  openSettingsModal?: () => void;
  LangCurrency?: React.ReactNode;
}

export default function MobileMenu({
  userInfo = false,
  unreadCount = 0,
  openSettingsModal,
  LangCurrency,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden" ref={ref}>
      {/* Top bar: menu button + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
          <div className="relative h-8 w-8">
            <Image
              fill
              className="object-contain h-8"
              priority
              src="/logo/logo-sort.png"
              alt="logo"
            />
          </div>
        </Link>
      </div>

      {/* Full-width dropdown panel */}
      {isOpen && (
        <>
          <div
            className="fixed left-0 right-0 top-16 bottom-0 bg-black/40 backdrop-blur-sm z-10 transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed left-0 right-0 top-16 bg-background-light dark:bg-background-dark z-50 py-6 shadow-lg">
            <div className="container mx-auto">
              <div>
                <h1 className="text-4xl font-bold mb-4">Quick Links</h1>
              </div>

              <Link
                href="/bestseller"
                className="block py-2 hover:text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                🔥Bestsellers
              </Link>

              <Link
                href="/about-us"
                className="block py-2 hover:text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>

              <Link
                href="/contact-us"
                className="block py-2 hover:text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>

              <hr className="my-4 border-gray-600" />

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Theme Mode</h1>
                  <ThemeToggle />
                </div>

                {userInfo && (
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Notifications</h1>
                    <Link
                      href="/notifications"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative cursor-pointer">
                        <IoNotificationsOutline className="w-6 h-6 text-gray-300 hover:text-primary transition-colors" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Language & Currency</h1>
                  {LangCurrency ?? (
                    <button
                      onClick={openSettingsModal}
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      <TbWorld className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
