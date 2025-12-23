import { getTrendingProducts } from "@/services/productService";
import ProductsCarousel from "../carousel/ProductsCarousel";

export default async function TrendingProducts() {
  const data = await getTrendingProducts();

  return (
    <>
      <h1 className="mt-8 text-3xl font-semibold text-center">
        Trending Products
      </h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        See what's currently popular and catch the latest trends in digital
        goods.
      </p>
      <div className="mb-8">
        <ProductsCarousel products={data} />
      </div>
    </>
  );
}
