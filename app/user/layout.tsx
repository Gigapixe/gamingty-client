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
          <main className="p-4 md:min-h-[calc(100vh-120px)] bg-background-light dark:bg-background-dark">
            {children}
          </main>
        </div>
      </div>
      <CategoryDrawer initialTree={initialTree} />
      <CartDrawer />
    </>
  );
}
