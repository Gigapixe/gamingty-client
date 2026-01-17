"use client";

import AllOrders from "@/components/dashboard/Order/AllOrders";
import DateRangeFilter, { DateRange } from "@/components/ui/DateRangeFilter";
import Select, { SelectOption } from "@/components/ui/Select";
import OrderIcon from "@/public/icons/user/OrderIcon";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const statusOptions: SelectOption[] = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "REFUNDED", label: "Refunded" },
];

const paymentOptions: SelectOption[] = [
  { value: "", label: "All Payment Methods" },
  { value: "card", label: "Card payment U..." },
  { value: "cryptomus", label: "Cryptomus" },
  { value: "binance", label: "Binance Pay" },
];


export default function MyOrders() {
  const searchParams = useSearchParams();

  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const statusFromUrl = searchParams.get("status") ?? "";
    const paymentFromUrl = searchParams.get("payment") ?? "";
    const searchFromUrl = searchParams.get("search") ?? "";

    setStatus(statusFromUrl);
    setPayment(paymentFromUrl);
    setSearch(searchFromUrl);
  }, [searchParams]);

  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10 mt-5">
        <h1 className="flex items-center gap-1.5 text-xl lg:text-2xl font-bold text-gray-900 dark:text-[#FFFFFF]">
          <OrderIcon className="" /> My Orders
        </h1>

        <div className="flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
          <div className="w-full lg:w-[320px] relative">
            <IoSearchOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice, order id..."
              className="w-full h-11 pl-10 pr-3 rounded-full border border-gray-200 
               dark:border-gray-700 bg-white dark:bg-[#111] 
               text-gray-900 dark:text-white outline-none 
               focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center w-full lg:w-auto">
            {/* status */}
            <div className="w-full">
              <Select
                value={status}
                onChange={(v) => setStatus(v)}
                options={statusOptions}
                placeholder="All Status"
                searchable={false}
                className="min-w-full"
              />
            </div>

            {/* payment */}
            <div className="w-full">
              <Select
                value={payment}
                onChange={(v) => setPayment(v)}
                options={paymentOptions}
                placeholder="All Payment Methods"
                searchable
                className="min-w-full"
              />
            </div>

            {/* date range */}
            <div className="w-full">
              <DateRangeFilter
                value={range}
                onChange={setRange}
                defaultLabel="All Time"
                weekStartsOn={1}
                className="min-w-50"
              />
            </div>
          </div>
        </div>
      </div>

      <AllOrders
        search={search}
        status={status}
        paymentMethod={payment}
        range={range}
      />
    </div>
  );
}

