
import { getPopularProducts } from "@/services/productService";
import ProductsCarousel from "../carousel/ProductsCarousel";

export default async function PopularProducts() {
  const data  = await getPopularProducts();
  return (
    <>
      <h1 className="mt-8 text-3xl font-semibold text-center">
        Popular Products
      </h1>
      <ProductsCarousel products={data} />
    </>
  );
}
