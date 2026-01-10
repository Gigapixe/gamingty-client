"use client";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HiOutlineChartBar } from "react-icons/hi";

type OverviewRow = {
  month: string;
  orders: number;
  avgValue: number; // average order value
};

// ---- Fake data (replace later with API) ----
const FAKE_DATA: OverviewRow[] = [
  { month: "Jan", orders: 320, avgValue: 42 },
  { month: "Feb", orders: 280, avgValue: 39 },
  { month: "Mar", orders: 410, avgValue: 45 },
  { month: "Apr", orders: 370, avgValue: 41 },
  { month: "May", orders: 520, avgValue: 48 },
  { month: "Jun", orders: 460, avgValue: 44 },
  { month: "Jul", orders: 610, avgValue: 51 },
  { month: "Aug", orders: 580, avgValue: 49 },
  { month: "Sep", orders: 430, avgValue: 43 },
  { month: "Oct", orders: 510, avgValue: 47 },
  { month: "Nov", orders: 690, avgValue: 55 },
  { month: "Dec", orders: 740, avgValue: 57 },
];

const fmtMoney = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

const fmtInt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

// ---- Tooltip ----
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // payload items have: name, value, dataKey, color/fill
  const rows = payload.map((p) => ({
    name: String(p?.name ?? ""),
    value: Number(p?.value ?? 0),
    key: String(p?.dataKey ?? ""),
    color: String(p?.fill ?? "currentColor"),
  }));

  return (
    <div className="min-w-45 p-3 rounded-xl border shadow-lg backdrop-blur-md
      bg-white/95 dark:bg-background-dark/95 border-gray-200 dark:border-[#303030]"
    >
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </p>

      <div className="mt-2 space-y-1.5">
        {rows.map((r, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: r.color }}
              />
              <span className="text-xs text-gray-700 dark:text-gray-200">
                {r.name}
              </span>
            </div>

            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {r.key === "avgValue" ? `$${fmtMoney(r.value)}` : fmtInt(r.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<any>(null);

  // later you can filter by dateRange; for now keep fake data
  const data = useMemo(() => FAKE_DATA, []);

  return (
    <div className="bg-white dark:bg-background-dark p-5 rounded-2xl border border-gray-200 dark:border-[#303030]">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HiOutlineChartBar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Order Overview
            </h3>
          </div>

          {/* <DateTimePicker onDateChange={setDateRange} defaultSelection="All Time" /> */}
            <div>Date Picker</div>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
            bg-emerald-50 text-emerald-700 border border-emerald-100
            dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Orders
          </span>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
            bg-sky-50 text-sky-700 border border-sky-100
            dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            Avg Order Value
          </span>

          {dateRange?.from && dateRange?.to ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
              Filtered
            </span>
          ) : null}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-90 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            barCategoryGap="28%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              opacity={0.12}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "currentColor", fontSize: 12, opacity: 0.75 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "currentColor", fontSize: 12, opacity: 0.75 }}
              tickFormatter={(v: number) => fmtInt(v)}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(16,185,129,0.08)" }}
            />

            {/* Orders */}
            <Bar
              dataKey="orders"
              name="Orders"
              fill="#10B981"
              radius={[10, 10, 0, 0]}
              maxBarSize={34}
            />

            {/* Avg order value */}
            <Bar
              dataKey="avgValue"
              name="Avg Value"
              fill="#0EA5E9"
              radius={[10, 10, 0, 0]}
              maxBarSize={34}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderChart;
