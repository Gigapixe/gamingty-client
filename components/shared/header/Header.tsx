import Image from "next/image";
import Link from "next/link";
import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";

export default function Header() {
  return (
    <nav className="sticky">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/">
            <Image
              src="/logo/logo-color.png"
              alt="Logo"
              width={400}
              height={400}
              className="w-48 h-10"
            />
          </Link>
          <input
            type="text"
            placeholder="Search games, brands and more..."
            className="grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
