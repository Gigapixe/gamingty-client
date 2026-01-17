"use client";

import { useState } from "react";
import DashNavMenu from "./DashNavMenu";
import { usePathname } from "next/navigation";
import { navItems } from "@/components/user/navData";

export default function DashNavToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Find the active nav item based on current pathname
  const activeNavItem = navItems.find((item) => item.href === pathname);
  const displayText = activeNavItem?.name || "Dashboard";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-primary/5 hover:bg-primary/10 rounded-xl px-4 py-3 flex items-center justify-between transition-colors group"
      >
        <div className="flex items-center gap-3">
          {activeNavItem?.icon && (
            <activeNavItem.icon className="w-5 h-5 text-primary" />
          )}
          <span className="text-gray-900 dark:text-white font-medium">
            {displayText}
          </span>
        </div>
        <svg
          className="w-5 h-5 text-primary transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <DashNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
