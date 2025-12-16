"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AuthStatus() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/auth/login" className="text-gray-600 hover:text-gray-800">
          Login
        </Link>
      </div>
    );
  }

  const getInitial = (u?: any) => {
    const nameOrEmail = u?.name ?? u?.email ?? "U";
    return String(nameOrEmail).trim().charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 hover:opacity-90 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user?.name || user?.email || "User"}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
            {getInitial(user)}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50">
          <Link href="/user" className="block px-4 py-2 hover:bg-gray-50">
            Profile
          </Link>
          <Link
            href="/user/orders"
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Orders
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
