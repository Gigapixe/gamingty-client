import Link from "next/link";
import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";

import Input from "@/components/ui/Input";
import FullLogo from "@/components/ui/FullLogo";

export default function Header() {
  return (
    <nav className="sticky">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 py-4">
          <FullLogo />
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
