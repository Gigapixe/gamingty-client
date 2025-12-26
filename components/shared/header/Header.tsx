"use client";
import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";
import AuthStatus from "./AuthStatus";
import FullLogo from "@/components/ui/FullLogo";
import CartButton from "./CartButton";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";

export default function Header() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const isUserRoute = pathname?.startsWith("/user");

  const getFirstName = (fullName?: string) => {
    if (!fullName) return null;
    const first = String(fullName).trim().split(" ")[0];
    return first ? first.charAt(0).toUpperCase() + first.slice(1) : null;
  };
  return (
    <nav
      className={`${
        isUserRoute ? "relative" : "sticky"
      } top-0 z-20 w-full shadow-sm bg-background-light dark:bg-background-dark`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 py-4">
          <div className="lg:block hidden">
            {isUserRoute && user ? (
              <div className="flex flex-col">
                <span className="text-sm">Welcome back,</span>
                <span className="text-2xl font-medium ">
                  {getFirstName(user.name)}
                </span>
              </div>
            ) : (
              <FullLogo />
            )}
          </div>
          <MobileMenu />
          <div className="hidden lg:block lg:flex-1 ">
            <Searchbar />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex">
              <CartButton />
            </div>
            <AuthStatus />
          </div>
        </div>
      </div>
      {/* desktop nav */}
      <div className="bg-primary lg:block hidden ">
        <div className={`${isUserRoute ? "" : "container mx-auto"}`}>
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
