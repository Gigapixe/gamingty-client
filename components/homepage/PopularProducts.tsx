import { getPopularProductsSSG } from "@/services/productService";
import ProductsCarousel from "../carousel/ProductsCarousel";

export default async function PopularProducts() {
  const data = await getPopularProductsSSG();
  return (
    <>
      <h1 className="mt-8 text-3xl font-semibold text-center">
        Popular Products
      </h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        Discover our most loved products that customers can't get enough of.
      </p>
      <ProductsCarousel products={data} />
    </>
  );
}
