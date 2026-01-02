"use client";

import { useAuthStore } from "@/zustand/authStore";

interface Props {
  onClose?: () => void;
}

export default function UserProfile() {
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return (
      <div className="w-full animate-pulse">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center gap-2 text-center">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold">
              {String(user.name ?? "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <hr className="border-border-light dark:border-border-dark w-full my-4" />

        {/* ID and Tier */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-1">
            <span className="text-gray-500 dark:text-gray-400">ID:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {user.userId}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="text-gray-500 dark:text-gray-400">Tier:</span>
            <span className="font-bold text-primary">
              {user.membershipTier}
            </span>
          </div>
        </div>
        <hr className="border-border-light dark:border-border-dark w-full mt-4" />

        {/* KYC Status */}
        <div className="flex justify-between items-center text-sm mt-4">
          <span className="text-gray-500 dark:text-gray-400">KYC Status:</span>
          {user.kycStatus ? (
            <span
              className={`font-bold text-xs capitalize ${
                user.kycStatus === "approved"
                  ? "text-primary"
                  : user.kycStatus === "pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {user.kycStatus}
            </span>
          ) : (
            <span className="font-bold text-gray-500">Not Submitted</span>
          )}
        </div>
      </div>
    </div>
  );
}
