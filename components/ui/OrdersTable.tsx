"use client";

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import StatusBadge from "../ui/StatusBadge";

export type OrderStatus =
  | ""
  | "PENDING"
  | "PROCESSING"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  | "ON_HOLD"
  | "REFUNDED";

type ICart={
  image:string;
  price:string | number;
  title:string;
  slug:string;
  quantity:number;
  isGiftCard:boolean
}

export type RecentOrder = {
  _id: string;
  invoice: string | number;
  total: number;
  paymentMethod: string;
  status: OrderStatus | string;
  createdAt: string; // ISO string
  cart:ICart
};

type RecentOrdersTableProps = {
  orders: RecentOrder[];
  onSelect: (orderId: string) => void;
  moneyCurrency?: string; // default "USD"
};

const toMoney = (n: number, currency = "USD") =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);

const normalizeStatus = (status: string) => {
  if (!status) return "";
  return status === "Cancel" ? "Cancelled" : status;
};

// You can swap this with dayjs later
const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrdersTable: React.FC<RecentOrdersTableProps> = ({
  orders,
  onSelect,
  moneyCurrency = "USD",
}) => {
  
  return (
    <section aria-label="Recent orders">
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => onSelect(order._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(order._id);
                }
              }}
              className="bg-gray-50 dark:bg-background-dark rounded-xl p-4 shadow-sm group hover:bg-gray-100 dark:hover:bg-[#202020] transition-colors duration-200 border border-gray-200 dark:border-border-dark cursor-pointer outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label={`Open order ${order.invoice}`}
            >
              <header className="flex justify-between items-center gap-4">
                {/* Left side */}
                <div className="flex flex-col gap-1 min-w-0">
                  {/* Line 1 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      #{order.invoice}
                    </span>

                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      {toMoney(order.total, moneyCurrency)}
                    </span>

                    <span className="text-sm text-gray-500 dark:text-[#E5E5E5] capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>

                  {/* Line 2 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={normalizeStatus(order.status)} />
                    <time
                      dateTime={order.createdAt}
                      className="text-sm text-gray-500 dark:text-[#E5E5E5] whitespace-nowrap"
                    >
                      {formatDateTime(order.createdAt)}
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

export default OrdersTable;
