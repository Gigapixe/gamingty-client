import CategoryToggleButton from "./CategoryToggleButton";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";
import AuthStatus from "./AuthStatus";
import FullLogo from "@/components/ui/FullLogo";
import CartButton from "./CartButton";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  return (
    <nav className="sticky top-0 z-20 w-full shadow-sm bg-background-light dark:bg-background-dark">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 py-4">
          <div className="lg:block hidden">
            <FullLogo />
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
      <div className="bg-primary lg:flex hidden ">
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
