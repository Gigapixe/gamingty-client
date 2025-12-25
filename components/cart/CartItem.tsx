"use client";

import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { CartItem as CartItemType } from "@/zustand/store";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  /** Show original price with strikethrough if available */
  showOriginalPrice?: boolean;
  /** Custom class for the container */
  className?: string;
  /** Image size in pixels (default: 80) */
  imageSize?: number;
  /** Compact layout for smaller screens or checkout summary */
  compact?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  showOriginalPrice = true,
  className = "",
  imageSize = 80,
  compact = false,
}: CartItemProps) {
  const handleDecrease = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className={`flex gap-3 py-3  rounded-lg ${className}`}>
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative rounded border border-gray-100 shadow-sm cursor-pointer  dark:border-gray-700 dark:shadow-none"
        style={{ width: imageSize, height: imageSize }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={`${imageSize}px`}
          className="object-contain rounded"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.slug}`}
          className={`font-medium text-gray-900 dark:text-white line-clamp-1 mb-1 hover:text-primary transition-colors ${
            compact ? "text-xs" : "text-base"
          }`}
        >
          {item.title}
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <p
            className={`text-gray-700 text-heading line-clamp-1 dark:text-white  ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            Item Price ${item.price.toFixed(2)}
          </p>
          {/* {showOriginalPrice && item.originalPrice && (
            <p
              className={`text-gray-400 line-through ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              ${item.originalPrice.toFixed(2)}
            </p>
          )} */}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus className={compact ? "text-xs" : "text-sm"} />
            </button>

            <span
              className={`w-8 text-center font-medium ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              {item.quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus className={compact ? "text-xs" : "text-sm"} />
            </button>
          </div>

          {/* Line Total (visible in non-compact mode) */}
          {!compact && (
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              ${lineTotal.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className={`text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors self-start ${
          compact ? "p-1" : "p-2"
        }`}
        aria-label="Remove item"
      >
        <FiTrash2 className={compact ? "text-base" : "text-lg"} />
      </button>
    </div>
  );
}
