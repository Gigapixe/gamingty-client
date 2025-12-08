"use client";

import Image from "next/image";
import Link from "next/link";
import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";
import { useThemeStore } from "@/zustand/store";
import Input from "@/components/ui/Input";

export default function Header() {
  return (
    <nav className="sticky">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/">
            <Image
              src={
                useThemeStore().theme === "dark"
                  ? "/logo/logo-dark.png"
                  : "/logo/logo-color.png"
              }
              alt="Logo"
              width={400}
              height={400}
              className="w-48 h-10"
              loading="eager"
            />
          </Link>
          <Input
            type="search"
            placeholder="Search games, brands and more..."
            className="grow"
          />
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-gray-800">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* desktop nav */}
      <div className="bg-primary">
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-2">
            <CategoryToggleButton />
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
