"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useCartStore } from "@/zustand/store";
import { useState } from "react";

type Product = {
  // title may be a localized object from API or a simple string
  title: string | { en?: string; zh?: string };
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
  isStock?: boolean;
  stock?: number;
  slug: string;
  _id?: string;
  id?: string;
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const { addToCart, openCart } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);

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
    product.isStock === false ||
    (typeof product.stock === "number" ? product.stock <= 0 : false);

  const titleText =
    typeof product.title === "string"
      ? product.title
      : product.title?.en ?? product.title?.zh ?? "";

  const productId = product._id || product.id || product.slug;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: productId,
      title: titleText,
      slug: product.slug,
      price: price,
      originalPrice: originalPrice,
      image: imageSrc,
    });

    // Optional: Open cart after adding
    openCart();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      className={`group relative w-52 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 bg-white dark:bg-background-dark-2 ${className}`}
      href={`/product/${product.slug}`}
    >
      {/* Product Image */}
      <div className="relative">
        <Image
          src={imageSrc}
          alt={titleText}
          height={600}
          width={600}
          className="object-contain"
          loading="eager"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Stock Status and Like */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium ${
              outOfStock ? "text-red-500" : "text-primary"
            }`}
          >
            {outOfStock ? "Out of Stock" : "In Stock"}
          </span>
          <button
            onClick={handleLike}
            className="p-1.5 hover:scale-110 transition-transform"
            aria-label="Add to wishlist"
          >
            <FiHeart
              className={`text-lg ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            />
          </button>
        </div>

        {/* Product Title */}
        <h2 className="text-sm font-medium  line-clamp-1">{titleText}</h2>

        {/* Price and Cart Button */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary font-bold">
              USD ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="line-through text-xs ">
                USD ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`p-3 rounded-xl transition-all ${
              outOfStock
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 hover:scale-105"
            } text-white`}
            aria-label="Add to cart"
          >
            <FiShoppingCart className="text-xl" />
          </button>
        </div>
      </div>
    </Link>
  );
}
