"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import UserNavLinks from "@/components/user/UserNavLinks";

export default function UserSideNav() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="hidden lg:block w-64 border-r border-gray-100 dark:border-[#1F1F1F] px-4 py-6">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-3 w-full">
          {user?.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-medium">
              {String(user?.name ?? "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </div>
          </div>
        </div>

        <nav className="w-full mt-2">
          <UserNavLinks
            activePath={pathname}
            onClose={() => {}}
            onLogout={handleLogout}
          />
        </nav>
      </div>
    </aside>
  );
}
