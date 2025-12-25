import ProductCard from "@/components/product/ProductCard";
import { getBestSellerProductsSSG } from "@/services/productService";
import Image from "next/image";

export default async function BestSellerPage() {
  const data = await getBestSellerProductsSSG();
  return (
    <div>
      <div className="relative">
        <Image
          src="/images/bestsellers.webp"
          alt="Bestsellers"
          width={1200}
          height={1200}
          className="w-full h-71.25"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-2xl lg:text-4xl font-bold ">
            The Most-Chosen Digital Gift Cards
          </h1>
          <p className="text=xs sm:tex-sm lg:text-base">
            Our most popular digital gift card trusted by millions!
          </p>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6">🔥Bestsellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {data?.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
