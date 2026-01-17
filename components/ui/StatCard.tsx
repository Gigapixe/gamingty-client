import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

type Trend = "Higher" | "Lower" | "Neutral";

type OrderStatus =
  | ""
  | "PENDING"
  | "PROCESSING"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  | "ON_HOLD"
  | "REFUNDED";

type Props = {
  title: string;
  value: string | number;
  change: string;
  trend: Trend;
  status?: OrderStatus; // ✅ includes ""
};

export const StatCard: React.FC<Props> = ({
  title,
  value,
  change,
  trend,
  status,
}) => {
  const href =
    status && status.length > 0
      ? `/user/my-orders?status=${encodeURIComponent(status)}`
      : "/user/my-orders";

  return (
    <Link href={href}>
      <div className="group p-5 rounded-xl border transition-all duration-500 bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary cursor-pointer">
        <div className="group p-5 rounded-xl border transition-all duration-500 bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-500 dark:text-[#E5E5E5] group-hover:text-emerald-100">
              {title}
            </h2>

            <div
              className={`p-2 rounded-full transition-colors duration-300 ${
                trend === "Lower"
                  ? "bg-red-100 group-hover:bg-white"
                  : "bg-[#12B47E1A] group-hover:bg-white"
              }`}
            >
              <MdArrowOutward
                className={`w-5 h-5 transition-transform duration-300 ${
                  trend === "Lower"
                    ? "text-red-500 rotate-180"
                    : "text-[#12B47E]"
                }`}
              />
            </div>
          </div>

          <h3 className="text-2xl lg:text-4xl font-bold -mt-1 text-gray-900 dark:text-[#FFFFFF] group-hover:text-white">
            {value}
          </h3>

          <p className="text-xs mt-2 text-gray-500 dark:text-[#E5E5E5] group-hover:text-emerald-200">
            <span
              className={`font-semibold ${
                trend === "Higher"
                  ? "text-emerald-500 group-hover:text-white"
                  : trend === "Lower"
                    ? "text-red-500 group-hover:text-red-200"
                    : "text-gray-500 group-hover:text-gray-200"
              }`}
            >
              {change}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
