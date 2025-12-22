"use client";

import CartIcon from "@/public/icons/CartIcon";
import { useCartStore } from "@/zustand/store";

const CartButton = () => {
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F1F] rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <CartIcon className="dark:text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-medium flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
