"use client";
import AllOrders from "@/components/dashboard/Order/AllOrders";
import DateRangeFilter, { DateRange } from "@/components/ui/DateRangeFilter";
import Select, { SelectOption } from "@/components/ui/Select";
import OrderIcon from "@/public/icons/user/OrderIcon";
import { useState } from "react";

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
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10 mt-5">
        <h1 className="flex items-center gap-1.5 text-xl lg:text-2xl font-bold text-gray-900 dark:text-[#FFFFFF]">
          <OrderIcon className="" /> My Orders
        </h1>

        <div className="flex flex-col items-center lg:items-end gap-4">
          <div>search</div>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {" "}
            <div className="w-full">
              <Select
                value={status}
                onChange={(v) => setStatus(v)}
                options={statusOptions}
                placeholder="All Status"
                searchable={false}
              />
            </div>
            <div className="w-full">
              <Select
                value={payment}
                onChange={(v) => setPayment(v)}
                options={paymentOptions}
                placeholder="All Payment Methods"
                searchable
                className="w-full"
              />
            </div>
            <div className="w-full">
              <DateRangeFilter
                value={range}
                onChange={setRange}
                defaultLabel="All Time"
                weekStartsOn={1}
              />
            </div>
          </div>
        </div>
      </div>
      <AllOrders />
    </div>
  );
}
