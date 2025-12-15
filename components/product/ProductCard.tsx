"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  title: string;
  // support API `prices` shape and legacy `DigitalPrice`
  prices?: {
    price: number;
    originalPrice?: number;
    discount?: number;
  };
  DigitalPrice?: {
    price: number;
  };
  // API sometimes returns `image` as an array
  image?: string | string[];
  stock?: number;
  slug: string;
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const imageSrc = Array.isArray(product.image)
    ? product.image[0]
    : product.image || "/images/placeholder.png";

  const price = product.prices?.price ?? product.DigitalPrice?.price ?? 0;
  const originalPrice = product.prices?.originalPrice;
  let discountPercent = 0;
  if (originalPrice && originalPrice > price) {
    discountPercent = Math.round(
      ((originalPrice - price) / originalPrice) * 100
    );
  } else if (
    product.prices?.discount &&
    product.prices.discount > 0 &&
    product.prices.discount <= 1
  ) {
    discountPercent = Math.round(product.prices.discount * 100);
  }
  const outOfStock =
    typeof product.stock === "number" ? product.stock <= 0 : false;
  return (
    <Link
      className={`group relative hover:-translate-y-1 w-40 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-200 ${className}`}
      href={`/product/${product.slug}`}
    >
      <Image
        src={imageSrc}
        alt="Product Image"
        width={200}
        height={200}
        className="object-fill w-full h-40"
        loading="eager"
      />
      {outOfStock && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Out of stock
        </div>
      )}
      <div className="p-2">
        <h2 className="font-semibold mt-2 text-center text-sm line-clamp-2 group-hover:text-primary transition-colors duration-150">
          {product.title}
        </h2>
      </div>
      <div className="text-lg font-semibold bg-gray-200 dark:bg-gray-700 rounded-b-xl p-2 text-center flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="line-through text-sm text-gray-500">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {/* {discountPercent > 0 && (
          <span className="text-xs text-green-700">{discountPercent}% off</span>
        )} */}
      </div>
    </Link>
  );
}
