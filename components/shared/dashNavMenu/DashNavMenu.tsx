"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { usePathname, useRouter } from "next/navigation";
import UserProfile from "@/components/user/UserProfile";
import UserNavLinks from "@/components/user/UserNavLinks";
import ArrowIcon from "@/public/icons/user/ArrowIcon";
import CloseIcon from "@/public/icons/user/CloseIcon";
import { navItems } from "@/components/user/navData";
import { useAuthStore } from "@/zustand/authStore";

interface DashNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashNavMenu({ isOpen, onClose }: DashNavMenuProps) {
  const [showMore, setShowMore] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  // Filter to show first 5 links when showMore is false, otherwise show all
  const visibleLinks = showMore ? navItems : navItems.slice(0, 5);

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/auth/login");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 max-h-[70vh]">
        {/* Profile Section - Fixed at the top */}
        <div className="sticky top-0 z-10 bg-white dark:bg-background-dark">
          <UserProfile />
        </div>

        <hr className="w-full border-border-light dark:border-border-dark" />

        {/* Notification Section */}
        <div className="px-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Notification
          </h3>
        </div>

        <hr className="w-full border-border-light dark:border-border-dark" />

        {/* Nav Links - Scrollable */}
        <nav className="flex flex-col w-full max-h-[calc(70vh-200px)] overflow-y-auto">
          <UserNavLinks
            items={visibleLinks}
            activePath={pathname}
            onClose={onClose}
            onLogout={handleLogout}
          />

          {/* Toggle See More */}
          {navItems.length > 5 && (
            <button
              className="bg-primary/10 text-primary px-4 py-2.5 rounded-lg mx-4 hover:bg-primary/20 transition-colors text-left mt-2"
              onClick={() => setShowMore((prev) => !prev)}
            >
              <p className="flex gap-2 justify-between items-center w-full">
                <span className="text-sm font-medium">
                  {showMore ? "See Less" : "See More"}
                </span>
                <span className="px-2 py-1 bg-primary rounded-full">
                  <ArrowIcon
                    className={`inline-block transition-transform text-white w-3 h-3 ${
                      showMore ? "rotate-[-135deg]" : "rotate-45"
                    }`}
                  />
                </span>
              </p>
            </button>
          )}
        </nav>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 p-4 bg-white dark:bg-background-dark rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
}
