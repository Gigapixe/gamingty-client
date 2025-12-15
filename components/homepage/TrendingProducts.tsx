import { getTrendingProducts } from "@/services/productService";
import ProductsCarousel from "../carousel/ProductsCarousel";

export default async function TrendingProducts() {
  const data = await getTrendingProducts();

  return (
    <>
      <h1 className="mt-8 text-3xl font-semibold text-center">
        Trending Products
      </h1>
      <div className="mb-8">
        <ProductsCarousel products={data} />
      </div>
    </>
  );
}
