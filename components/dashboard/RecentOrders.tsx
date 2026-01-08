"use client";
import React, { useCallback, useMemo, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { IoBagHandle } from "react-icons/io5";
import StatusBadge from "../ui/StatusBadge";


type OrderStatus =
  | "Pending"
  | "Processing"
  | "Delivered"
  | "Failed"
  | "Cancelled"
  | "On Hold"
  | "Refunded";

type RecentOrder = {
  _id: string;
  invoice: string | number;
  total: number;
  paymentMethod: string;
  status: OrderStatus | string;
  createdAt: string; // ISO string
};

const FAKE_ORDERS: RecentOrder[] = [
  {
    _id: "o_1001",
    invoice: "INV-1001",
    total: 129.99,
    paymentMethod: "card",
    status: "Delivered",
    createdAt: "52024-06-10T14:48:00.000Z",
  },
  {
    _id: "o_1002",
    invoice: "INV-1002",
    total: 45.5,
    paymentMethod: "wallet",
    status: "Processing",
    createdAt: "2024-06-12T09:30:00.000Z",
  },
  {
    _id: "o_1003",
    invoice: "INV-1003",
    total: 299.0,
    paymentMethod: "cash",
    status: "Pending",
    createdAt: "2024-06-14T16:15:00.000Z",
  },
  {
    _id: "o_1004",
    invoice: "INV-1004",
    total: 15.75,
    paymentMethod: "card",
    status: "Failed",
    createdAt: "2024-06-15T11:20:00.000Z",
  },
  {
    _id: "o_1005",
    invoice: "INV-1005",
    total: 89.25,
    paymentMethod: "wallet",
    status: "Cancelled",
    createdAt: "2024-06-16T13:45:00.000Z",
  },
];

const toMoney = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);

const normalizeStatus = (status: string) => {
  if (!status) return "";
  return status === "Cancel" ? "Cancelled" : status;
};

const RecentOrders: React.FC = () => {
  // Fake-mode states (replace with API states later)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const [selectedOrderData, setSelectedOrderData] = useState<RecentOrder | null>(
    null
  );

  const recentOrders = useMemo(() => FAKE_ORDERS, []);

  const handleOrderCardClick = useCallback(
    (orderId: string) => {
      const selectedOrder = recentOrders.find((o) => o._id === orderId) || null;
      setSelectedOrderData(selectedOrder);
    },
    [recentOrders]
  );

  const handleBackToOrders = useCallback(() => {
    setSelectedOrderData(null);
  }, []);

  // Loading
  if (loading) {
    return (
      <section aria-busy="true" className="py-6">
        <div className="w-full h-28 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-xl border border-gray-200 dark:border-[#303030]" />
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section aria-live="polite" className="text-center py-10">
        <p className="text-red-500 font-medium">{error}</p>
      </section>
    );
  }

  // Order details view (kept same)
//   if (selectedOrderData) {
//     return (
//       <section aria-label="Order details">
//         <OrderDetails order={selectedOrderData as any} onBack={handleBackToOrders} />
//       </section>
//     );
//   }

  // Empty
  if (recentOrders.length === 0) {
    return (
      <section className="text-center py-10" aria-label="No orders">
        <span className="flex justify-center text-emerald-500 text-6xl mb-4">
          <IoBagHandle />
        </span>
        <h2 className="font-medium text-lg text-gray-600 dark:text-[#E5E5E5]">
          You have no orders yet!
        </h2>
        <p className="text-sm text-gray-500 dark:text-[#E5E5E5]">
          Make a purchase to see your orders here.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Recent orders">
      <ul className="space-y-4">
        {recentOrders.map((order) => (
          <li key={order._id}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => handleOrderCardClick(order._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOrderCardClick(order._id);
                }
              }}
              className="bg-gray-50 dark:bg-background-dark rounded-xl p-4 shadow-sm group hover:bg-gray-100 dark:hover:bg-[#202020] transition-colors duration-200 border border-gray-200 dark:border-[#303030] cursor-pointer outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label={`Open order ${order.invoice}`}
            >
              <header className="flex justify-between items-center gap-4">
                {/* Left side */}
                <div className="flex flex-col gap-1 min-w-0">
                  {/* Line 1: invoice + amount + payment */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      #{order.invoice}
                    </span>

                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      {toMoney(order.total)}
                    </span>

                    <span className="text-sm text-gray-500 dark:text-[#E5E5E5] capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>

                  {/* Line 2: status + date */}
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={normalizeStatus(order.status)} />
                    <time
                      dateTime={order.createdAt}
                      className="text-sm text-gray-500 dark:text-[#E5E5E5] whitespace-nowrap"
                    >
                      {(order.createdAt)}
                    </time>
                  </div>
                </div>

                {/* Right chevron */}
                <FiChevronRight className="shrink-0 text-gray-400 text-xl group-hover:translate-x-1 transition-transform duration-200" />
              </header>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentOrders;
