"use client";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import OrderChart from "@/components/dashboard/OrderChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopProductsTable from "@/components/dashboard/TopProductsTable";
import DateRangeFilter, { DateRange } from "@/components/ui/DateRangeFilter";
import { useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { TbAward } from "react-icons/tb";

export default function userDashboard() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [topProductRange, setTopProductRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 mt-5">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-[#FFFFFF]">
          Dashboard
        </h1>
        <div>
          <DateRangeFilter
            value={range}
            onChange={setRange}
            defaultLabel="All Time"
            weekStartsOn={1}
          />
        </div>
      </div>
      <DashboardAnalytics range={range} />

      {/* --- Charts & Top Products --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-7">
        {/* --- Order Overview Chart Component --- */}
        <div className="lg:col-span-3">
          <OrderChart />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-background-dark p-5 rounded-xl border border-gray-200 dark:border-[#303030]">
          <div className="flex justify-between items-center mb-4 gap-3">
            <div className="flex items-center gap-2">
              <TbAward className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-[#FFFFFF]">
                Top Products
              </h3>
            </div>

            <div>
              <DateRangeFilter
                value={topProductRange}
                onChange={setTopProductRange}
                defaultLabel="All Time"
                weekStartsOn={1}
              />
            </div>
          </div>
          <TopProductsTable range={topProductRange} />
        </div>
      </div>

      {/* --- Recent Orders --- */}
      <div className="bg-white dark:bg-background-dark p-2 lg:p-5 rounded-xl border border-gray-200 dark:border-[#303030]">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-[#FFFFFF] flex items-center gap-2">
            <IoMdPricetag className="text-primary" />
            Recent Orders
          </h3>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
}
