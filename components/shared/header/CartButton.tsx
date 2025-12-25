"use client";

import CartIcon from "@/public/icons/CartIcon";
import { useCartStore } from "@/zustand/store";

import { useEffect, useState } from "react";

const CartButton = () => {
  const { openCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const totalItems = getTotalItems();

  useEffect(() => {
    // Mark mounted so we only show client-driven UI after hydration
    setMounted(true);
  }, []);

  return (
    <button
      onClick={openCart}
      className="relative lg:hover:scale-105 lg:transition-all lg:duration-200 flex flex-col items-center"
      aria-label="Shopping cart"
    >
      <span className="hidden lg:inline-block">
        <CartIcon />
      </span>
      <span className="lg:hidden">
        <CartIcon fill="white" />
      </span>
      {mounted && totalItems > 0 && (
        <span className="absolute right-0 -top-2 lg:-right-2 h-5 w-5 rounded-full bg-red-500 lg:bg-primary text-white text-xs font-medium flex items-center justify-center">
          {totalItems}
        </span>
      )}
      <h1 className="text-xl text-white lg:hidden">Cart</h1>
    </button>
  );
};

export default CartButton;
