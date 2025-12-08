"use client";
import { useThemeStore } from "@/zustand/store";
import Image from "next/image";
import Link from "next/link";

export default function FullLogo() {
  return (
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
  );
}
