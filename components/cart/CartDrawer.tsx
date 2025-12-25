"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/zustand/store";
import { IoBagCheckOutline, IoBagHandle } from "react-icons/io5";
import CloseButton from "@/components/ui/CloseButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCartStore();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out"
          onClick={closeCart}
          style={{ opacity: isOpen ? 1 : 0 }}
          aria-hidden="true"
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 lg:w-105 bg-background-light dark:bg-background-dark shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4  flex items-center justify-between border-b border-primary/20">
            <div className="flex items-center gap-2">
              <IoBagCheckOutline className="text-xl text-primary" />
              <h3 className="font-medium ">Shopping Cart</h3>
            </div>

            <CloseButton
              ref={closeButtonRef}
              onClick={closeCart}
              ariaLabel="Close cart"
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {items.length === 0 ? (
              <div className="flex flex-col h-full justify-center py-10">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center w-24 h-24 rounded-full bg-emerald-50 mb-4 dark:bg-emerald-900/20">
                    <span className="text-emerald-500 text-5xl dark:text-emerald-400">
                      <IoBagHandle />
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="px-12 text-center text-gray-500 mb-6 dark:text-gray-300">
                    No items added in your cart. Please add product to your cart
                    list.
                  </p>
                  <Button className="rounded-md! py-3!">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-[#1F1F1F] bg-gray-50 dark:bg-gray-700 p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium">
                  USD ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>USD ${totalPrice.toFixed(2)}</span>
              </div>

              {/* <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-between px-4"
              >
                <span>Proceed To Checkout</span>
                <span>USD ${totalPrice.toFixed(2)}</span>
              </button> */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 flex items-center justify-between text-white focus:outline-none transition duration-300 shadow-lg hover:shadow-xl dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:shadow-none dark:hover:shadow-none"
              >
                <span className="text-base font-medium">
                  Proceed To Checkout
                </span>
                <span className="rounded-lg font-bold py-2 px-4 bg-emerald-600 text-white dark:bg-emerald-700">
                  <span>USD ${totalPrice.toFixed(2)}</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
