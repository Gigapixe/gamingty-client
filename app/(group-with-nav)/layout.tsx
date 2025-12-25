import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/shared/footer/Footer";
import MobileFooter from "@/components/shared/footer/MobileFooter";
import CategoryDrawer from "@/components/shared/header/CategoryDrawer";
import Header from "@/components/shared/header/Header";
import { getAllCategoriesSSG } from "@/services/categoryService";

export default async function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch categories at build time (SSG) to speed up drawer open
  const catsRes = await getAllCategoriesSSG();
  const initialTree = catsRes?.data || [];
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileFooter />
      </div>
      <CategoryDrawer initialTree={initialTree} />
      <CartDrawer />
    </>
  );
}
