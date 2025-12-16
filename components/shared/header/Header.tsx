import Link from "next/link";
import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";
import AuthStatus from "./AuthStatus";

import Input from "@/components/ui/Input";
import FullLogo from "@/components/ui/FullLogo";

export default function Header() {
  return (
    <nav className="sticky top-0 z-20 w-full shadow-sm bg-white dark:bg-[#161616]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 py-4">
          <FullLogo />
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search games, brands and more..."
              className="grow"
            />
          </div>
          <div className="flex items-center gap-4">
            <AuthStatus />
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
