"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { BsCart3, BsCartCheck } from "react-icons/bs";
import { useCartStore } from "@/zustand/store";
import { useState } from "react";
import {
  IoBagAddSharp,
  IoBagCheckOutline,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";

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
  const { addToCart, openCart, items } = useCartStore();
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

  // Check if product is in cart
  const isInCart = items.some((item) => item.id === productId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      // If already in cart, open cart drawer
      openCart();
    } else {
      // If not in cart, add to cart
      addToCart({
        id: productId,
        title: titleText,
        slug: product.slug,
        price: price,
        originalPrice: originalPrice,
        image: imageSrc,
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`group rounded-xl bg-background-light dark:bg-white/5 max-w-50.5 ${className}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%]">
          <Image
            src={imageSrc}
            alt={titleText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center rounded-t-xl"
            loading="eager"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              outOfStock
                ? "bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary"
                : "bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary"
            }`}
          >
            {outOfStock ? "Out of Stock" : "In Stock"}
          </div>
          <button
            onClick={handleLike}
            className={`text-2xl transition-colors ${
              isLiked
                ? "text-red-500"
                : "text-content-subtle hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
            }`}
            aria-label="Toggle wishlist"
          >
            {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
          </button>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h2 className="text-base font-medium text-content-default mt-1 mb-2 line-clamp-1 cursor-pointer hover:text-primary transition-colors dark:text-gray-200 dark:hover:text-primary overflow-hidden text-ellipsis whitespace-nowrap">
            {titleText}
          </h2>
        </Link>

        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col">
            <span className="text-primary dark:text-primary font-bold text-sm whitespace-nowrap">
              {"USD\u00A0$" + price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-content-subtle text-xs line-through dark:text-gray-400 whitespace-nowrap">
                {"USD\u00A0$" + originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label={isInCart ? "View Cart" : "Add to cart"}
            className={`${
              outOfStock
                ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                : isInCart
                ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-primary hover:bg-primary-600 dark:bg-primary dark:hover:bg-primary-700"
            } text-white p-2.5 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md flex items-center justify-center dark:shadow-none dark:hover:shadow-none`}
          >
            {isInCart ? (
              <IoBagCheckOutline className="text-xl" />
            ) : (
              <IoBagAddSharp className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
