import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard",
    description: "Manage your account and view your orders.",
  };
}
import UserSideNav from "@/components/user/UserSideNav";
import Header from "@/components/shared/header/Header";
import DashNavToggle from "@/components/shared/dashNavMenu/DashNavToggle";
import { getAllCategoriesSSG } from "@/services/categoryService";
import CategoryDrawer from "@/components/shared/header/CategoryDrawer";
import CartDrawer from "@/components/cart/CartDrawer";

export default async function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const catsRes = await getAllCategoriesSSG();
  const initialTree = catsRes?.data || [];
  return (
    <>
      <div className="flex">
        <UserSideNav />
        <div className="flex-1">
          <Header />
          {/* Dashboard Navigation Toggle - Shows under header (hidden on lg and above) */}
          <div className="sticky top-0 z-30 bg-background dark:bg-background-dark px-4 pt-4 md:px-5 md:pt-5 pb-3 lg:hidden">
            <DashNavToggle />
          </div>
          <main className="px-4 pb-4 md:px-5 md:pb-5 md:min-h-[calc(100vh-200px)] bg-background dark:bg-background-dark">
            {children}
          </main>
        </div>
      </div>
      <CategoryDrawer initialTree={initialTree} />
      <CartDrawer />
    </>
  );
}
