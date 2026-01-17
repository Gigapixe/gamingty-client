"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoPrintOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

import { useAuthStore } from "@/zustand/authStore";
import { getOrderById } from "@/services/orderService";
import { Order } from "@/types/order";
import DownloadInvoicePdfButton from "./DownloadInvoicePdfButton";
import InvoiceActions from "./InvoiceActions";

function formatDate(d?: string) {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMoney(n?: number) {
  const v = Number(n ?? 0);
  return `USD$${v.toFixed(2)}`;
}

interface IDParams {
  id: string;
}

export default function OrderInvoice({ id }: IDParams) {
  const { token } = useAuthStore();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!id) return;
      if (!token) return;

      setLoading(true);
      try {
        const res = await getOrderById(id, { token, cache: "no-store" });
        const data = (res as any)?.data ?? res;
        if (!cancelled) setOrder(data as Order);
      } catch (e: any) {
        if (!cancelled) toast.error(e?.message ?? "Failed to load invoice");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [id, token]);

  const onPrint = () => window.print();

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
        Loading invoice...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
        Invoice not found.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Top message bar */}
      <div className="no-print mb-4 rounded-lg border border-gray-300 dark:border-primary/20 dark:bg-primary/10 px-4 py-3 text-sm text-primary/80 dark:text-primary/50">
        <span className="text-primary font-medium">
          {order?.user_info?.name ?? "Customer"}
        </span>
        {", You have successfully placed your order."}
      </div>

      {/* ✅ invoice area to convert into PDF */}
      <div
        ref={invoiceRef}
        className="print-card overflow-hidden rounded-2xl border border-gray-700 dark:bg-background-dark shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold dark:text-white tracking-wide">
                INVOICE
              </h1>
              <div className="mt-2 text-xs dark:text-gray-300">
                Status :{" "}
                <span className="text-emerald-400">{order.status ?? "—"}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="dark:text-white font-semibold tracking-wide">
                GAMINGTY
              </div>
              <div className="text-[10px] dark:text-gray-300 mt-1">
                FLEXITECH LLC FZ
              </div>
              <div className="mt-3 text-[10px] leading-5 dark:text-gray-300">
                The Meydan Hotel, Grandstand, 6th floor,
                <br />
                Meydan Road, Nad Al Sheba, Dubai, UAE
                <br />
                support@gamingty.com
              </div>
            </div>
          </div>

          <div className="mt-6 border-t dark:border-white/10" />

          {/* Meta row */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <div className="text-[11px] font-semibold dark:text-gray-200">
                DATE
              </div>
              <div className="mt-1 text-[11px] dark:text-gray-300">
                {formatDate(order.createdAt)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[11px] font-semibold dark:text-gray-200">
                ORDER NO.
              </div>
              <div className="mt-1 text-[11px] dark:text-gray-300">
                #{order.invoice ?? order._id}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-semibold dark:text-gray-200">
                ORDER TO.
              </div>
              <div className="mt-1 text-[11px] dark:text-gray-300 leading-5">
                {order?.user_info?.name ?? "-"}
                <br />
                {order?.user_info?.email ?? "-"}
                <br />
                {order?.user_info?.address ?? "-"}
                <br />
                {order?.user_info?.country ?? "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="px-6 sm:px-8 pb-6">
          <div className="rounded-xl border dark:border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-200 dark:bg-white/10 px-4 py-3 text-[11px] font-semibold dark:text-gray-200">
              <div className="col-span-1">#</div>
              <div className="col-span-7">ITEM</div>
              <div className="col-span-2 text-center">QUANTITY</div>
              <div className="col-span-2 text-right">PRICE</div>
            </div>

            <div className="divide-y divide-white/10">
              {order.cart?.map((it, idx) => (
                <div
                  key={it._id ?? idx}
                  className="grid grid-cols-12 px-4 py-4 text-[11px] dark:text-gray-200"
                >
                  <div className="col-span-1 dark:text-gray-400">{idx + 1}</div>
                  <div className="col-span-7">{it.title}</div>
                  <div className="col-span-2 text-center font-semibold dark:text-white">
                    {it.quantity}
                  </div>
                  <div className="col-span-2 text-right font-semibold dark:text-white">
                    {formatMoney(it.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="mt-4 border-t dark:border-white/10" />

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-[11px] font-semibold dark:text-gray-200">
                PAYMENT METHOD
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] dark:text-gray-300">
                {order.paymentMethodImage ? (
                  <Image
                    src={order.paymentMethodImage}
                    alt="pm"
                    width={20}
                    height={20}
                    className="rounded"
                  />
                ) : null}
                <span className="capitalize">{order.paymentMethod ?? "-"}</span>
              </div>
            </div>

            <div className="sm:text-center">
              <div className="text-[11px] font-semibold dark:text-gray-200">
                DISCOUNT
              </div>
              <div className="mt-2 text-[11px] dark:text-gray-300">
                {formatMoney(order.discount ?? 0)}
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-[11px] font-semibold dark:text-gray-200">
                TOTAL AMOUNT
              </div>
              <div className="mt-2 text-xl font-extrabold text-rose-400">
                {formatMoney(order.total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions (outside PDF capture OR keep inside if you want them printed) */}
      <div className="no-print mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <DownloadInvoicePdfButton
          order={order}
          filename={`invoice-${order?.invoice ?? order?._id}.pdf`}
        />

        <InvoiceActions order={order} />
      </div>
    </div>
  );
}
