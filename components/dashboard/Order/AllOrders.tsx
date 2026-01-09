"use client";

import React, { useCallback, useMemo, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import OrdersTable, { RecentOrder } from "../../ui/OrdersTable";
import Pagination from "../../ui/Pagination"; // ✅ import

const FAKE_ORDERS: RecentOrder[] = [
  {
    _id: "o_1001",
    invoice: "INV-1001",
    total: 129.99,
    paymentMethod: "card",
    status: "Delivered",
    createdAt: "2024-06-10T14:48:00.000Z",
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

const PAGE_SIZE = 5;

const AllOrders: React.FC = () => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const [selectedOrderData, setSelectedOrderData] =
    useState<RecentOrder | null>(null);

  const [page, setPage] = useState(1);

  const allOrders = useMemo(() => FAKE_ORDERS, []);
  const total = allOrders.length;

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allOrders.slice(start, start + PAGE_SIZE);
  }, [allOrders, page]);

  const handleSelectOrder = useCallback(
    (orderId: string) => {
      const selected = allOrders.find((o) => o._id === orderId) || null;
      setSelectedOrderData(selected);
    },
    [allOrders]
  );

  const handleBackToOrders = useCallback(() => {
    setSelectedOrderData(null);
  }, []);

  if (loading) {
    return (
      <section aria-busy="true" className="py-6">
        <div className="w-full h-28 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-xl border border-gray-200 dark:border-[#303030]" />
      </section>
    );
  }

  if (error) {
    return (
      <section aria-live="polite" className="text-center py-10">
        <p className="text-red-500 font-medium">{error}</p>
      </section>
    );
  }

  if (total === 0) {
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
    <div className="space-y-4">
      <OrdersTable
        orders={pagedOrders}
        onSelect={handleSelectOrder}
        moneyCurrency="USD"
      />

      {selectedOrderData && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Selected:{" "}
          <span className="font-semibold">{selectedOrderData.invoice}</span>{" "}
          <button
            type="button"
            onClick={handleBackToOrders}
            className="ml-2 text-primary underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* ✅ Pagination row like your screenshot */}
      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={(p) => setPage(p)}
        className="pt-2"
      />
    </div>
  );
};

export default AllOrders;
