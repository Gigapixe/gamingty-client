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
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  showOriginalPrice = true,
  className = "",
  imageSize = 80,
}: CartItemProps) {
  const handleDecrease = () => {
    // Don't go below 1
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string for typing
    if (value === "") return;

    const num = parseInt(value, 10);

    // Only update if valid number >= 1
    if (!isNaN(num) && num >= 1) {
      onUpdateQuantity(item.id, num);
    }
  };

  const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseInt(value, 10);

    // Reset to 1 if invalid or empty
    if (isNaN(num) || num < 1) {
      onUpdateQuantity(item.id, 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className={`flex gap-3 py-3 rounded-lg ${className}`}>
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative rounded border border-gray-100 shadow-sm cursor-pointer dark:border-gray-700 dark:shadow-none"
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
        {/* Title and Line Total Row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            href={`/product/${item.slug}`}
            className="font-medium text-base text-gray-900 dark:text-white line-clamp-1 hover:text-primary transition-colors"
          >
            {item.title}
          </Link>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            ${lineTotal.toFixed(2)}
          </p>
        </div>

        {/* Unit Price */}
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-gray-700 dark:text-white line-clamp-1">
            Item Price ${item.price.toFixed(2)}
          </p>
          {/* {showOriginalPrice && item.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              ${item.originalPrice.toFixed(2)}
            </p>
          )} */}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-gray-100 bg-white text-gray-600 rounded-md dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <FiMinus className="text-sm" />
            </button>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              className="w-12 text-center text-sm font-medium bg-white dark:bg-[#1F1F1F] border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="Quantity"
            />

            <button
              onClick={handleIncrease}
              className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus className="text-sm" />
            </button>
          </div>

          {/* Remove Button (moved beside quantity) */}
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors ml-2"
            aria-label="Remove item"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
