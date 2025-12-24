"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/zustand/store";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { IoBagAddSharp, IoBagCheckOutline } from "react-icons/io5";
import CloseButton from "@/components/ui/CloseButton";

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
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 lg:w-105 bg-white dark:bg-[#0B0B0B] shadow-xl transform ${
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
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <BsCart3 className="text-6xl text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 dark:bg-[#161616] rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 shrink-0 bg-white dark:bg-[#1F1F1F] rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-primary font-semibold mb-2">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="text-sm" />
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded bg-gray-200 dark:bg-[#1F1F1F] hover:bg-gray-300 dark:hover:bg-[#2A2A2A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-[#1F1F1F] p-4 space-y-3">
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

              <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-between px-4"
              >
                <span>Proceed To Checkout</span>
                <span>USD ${totalPrice.toFixed(2)}</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
