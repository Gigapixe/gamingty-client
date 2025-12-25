import CategoryToggleButton from "./CategoryToggleButton";
import CategoryDrawer from "./CategoryDrawer";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/lib/ThemeToggle";
import AuthStatus from "./AuthStatus";
import FullLogo from "@/components/ui/FullLogo";
import { getAllCategoriesSSG } from "@/services/categoryService";
import CartButton from "./CartButton";
import CartDrawer from "../../cart/CartDrawer";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  // Fetch categories at build time (SSG) to speed up drawer open
  const catsRes = await getAllCategoriesSSG();
  const initialTree = catsRes?.data || [];

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
            <CartButton />
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
      <CategoryDrawer initialTree={initialTree} />
      <CartDrawer />
    </nav>
  );
}
