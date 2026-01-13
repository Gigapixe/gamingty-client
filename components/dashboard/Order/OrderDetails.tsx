"use client";

import React, { useMemo, useState } from "react";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";

type OrderDetailsProps = {
  order: any; // you can strongly type later
  onBack: () => void;
};

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onBack,
}) => {
  const [showKeys, setShowKeys] = useState(false);

  // ✅ handle Delivered vs DELIVERED vs delivered
  const isDelivered = useMemo(() => {
    const s = String(order?.status ?? "").toLowerCase();
    return s === "delivered";
  }, [order?.status]);

  const statusText = order?.status ?? "Unknown";

  const handleViewKeys = () => {
    setShowKeys(true);
  };

  return (
    <div className="space-y-4 bg-white dark:bg-background-dark p-4 rounded-lg border border-gray-200 dark:border-[#303030]">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
      >
        <IoChevronBackOutline />
        Back to Orders
      </button>

      {/* Header Card */}
      <div className="rounded-xl border border-gray-200 dark:border-[#303030] bg-white dark:bg-[#111] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-semibold text-gray-900 dark:text-white">
            Order #{order?.invoice ?? order?._id}
          </div>
          <div className="text-gray-700 dark:text-gray-200">
            USD ${Number(order?.total ?? 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {order?.paymentMethod ?? "-"}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <span
            className={[
              "px-2 py-0.5 rounded-full text-xs font-medium",
              isDelivered
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700 dark:bg-[#1b1b1b] dark:text-gray-300",
            ].join(" ")}
          >
            {statusText}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
          </span>
        </div>
      </div>

      {/* Product Card + View Keys */}
      <div className="rounded-xl border border-gray-200 dark:border-[#303030] bg-white dark:bg-[#111] p-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {order?.cart?.[0]?.title ?? "Order Items"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Price: USD ${Number(order?.total ?? 0).toFixed(2)}{" "}
            {order?.cart?.[0]?.quantity ? `| x${order.cart[0].quantity}` : ""}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Type: {order?.cart?.[0]?.type ?? "-"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleViewKeys}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-[#0f1a14]"
          >
            <IoKeyOutline />
            View Keys
          </button>

          {/* optional: invoice button */}
          <button
            type="button"
            className="px-4 h-10 rounded-full border border-gray-300 dark:border-[#444] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1b1b1b]"
          >
            View Invoice
          </button>
        </div>
      </div>

      {/* Keys Section (only after clicking View Keys) */}
      {showKeys && (
        <div className="rounded-xl border border-gray-200 dark:border-[#303030] bg-white dark:bg-[#111] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Keys & Credentials
            </h3>

            {/* optional download button (only if delivered) */}
            <button
              type="button"
              disabled={!isDelivered}
              className={[
                "px-4 h-10 rounded-full text-sm font-medium inline-flex items-center gap-2",
                isDelivered
                  ? "bg-emerald-500 text-white hover:opacity-95"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-[#1b1b1b] dark:text-gray-500",
              ].join(" ")}
            >
              Download All (CSV)
            </button>
          </div>

          {!isDelivered ? (
            <div className="rounded-lg border border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#0f0f0f] p-4 text-sm text-gray-700 dark:text-gray-200">
              Your order is currently <b>{statusText}</b>. Keys will be
              available once it's delivered.
            </div>
          ) : (
            <div className="space-y-3">
              {/* Example keys rendering:
                  Replace this with actual keys data source (order.credentials etc.) */}
              <div className="rounded-lg border border-gray-200 dark:border-[#303030] p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Redeem Code
                </div>
                <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                  {/* example */}
                  {order?.credentials?.[0]?.code ?? "—"}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
