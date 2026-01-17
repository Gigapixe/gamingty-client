"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/zustand/authStore";
import type { DateRange } from "@/components/ui/DateRangeFilter";
import { getOrderStats } from "@/services/orderService";
import { StatCard } from "../ui/StatCard";
import { OrderStatus } from "../ui/OrdersTable";

type DashboardAnalyticsProps = {
  range: DateRange;
};

type StatsBlock = {
  total: number;
  pending: number;
  processing: number;
  delivered: number;
  cancelled: number;
  onHold: number;
  refunded: number;
  failed: number;
};

type Item = {
  title: string;
  value: number;
  change: string;
  trend: "Higher" | "Lower" | "Neutral";
  status: OrderStatus;
};

type StatsResponse = {
  status: "success" | "error";
  message: string;
  data: {
    current: StatsBlock;
    previous: StatsBlock;
  };
};

const emptyStats: StatsBlock = {
  total: 0,
  pending: 0,
  processing: 0,
  delivered: 0,
  cancelled: 0,
  onHold: 0,
  refunded: 0,
  failed: 0,
};

const getTrend = (current: number, previous: number) => {
  if (current > previous) return "Higher" as const;
  if (current < previous) return "Lower" as const;
  return "Neutral" as const;
};

const getChangeText = (current: number, previous: number) => {
  if (previous === 0 && current === 0) return "No change vs previous period";
  if (previous === 0 && current > 0) return `+${current} vs previous period`;
  const diff = current - previous;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff} vs previous period`;
};

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  range,
}) => {
  const { token } = useAuthStore();

  const [current, setCurrent] = useState<StatsBlock>(emptyStats);
  const [previous, setPrevious] = useState<StatsBlock>(emptyStats);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!token) {
        setCurrent(emptyStats);
        setPrevious(emptyStats);
        return;
      }

      try {
        const res = (await getOrderStats(
          {
            startDate: range?.from ?? undefined,
            endDate: range?.to ?? undefined,
          },
          { token: token ?? undefined }
        )) as StatsResponse;

        if (cancelled) return;

        setCurrent(res?.data?.current ?? emptyStats);
        setPrevious(res?.data?.previous ?? emptyStats);
      } catch {
        if (!cancelled) {
          setCurrent(emptyStats);
          setPrevious(emptyStats);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [token, range?.from, range?.to]);

  const items = useMemo(() => {
    return [
      {
        title: "Total Order",
        value: current.total,
        change: getChangeText(current.total, previous.total),
        trend: getTrend(current.total, previous.total),
        status: "",
      },
      {
        title: "Delivered Order",
        value: current.delivered,
        change: getChangeText(current.delivered, previous.delivered),
        trend: getTrend(current.delivered, previous.delivered),
        status: "DELIVERED",
      },
      {
        title: "Failed Order",
        value: current.failed,
        change: getChangeText(current.failed, previous.failed),
        trend: getTrend(current.failed, previous.failed),
        status: "FAILED",
      },
      {
        title: "Pending Order",
        value: current.pending,
        change: getChangeText(current.pending, previous.pending),
        trend: getTrend(current.pending, previous.pending),
        status: "PENDING",
      },
      {
        title: "Processing Order",
        value: current.processing,
        change: getChangeText(current.processing, previous.processing),
        trend: getTrend(current.processing, previous.processing),
        status: "PROCESSING",
      },
      {
        title: "Cancelled Order",
        value: current.cancelled,
        change: getChangeText(current.cancelled, previous.cancelled),
        trend: getTrend(current.cancelled, previous.cancelled),
        status: "CANCELLED",
      },
      {
        title: "On Hold Order",
        value: current.onHold,
        change: getChangeText(current.onHold, previous.onHold),
        trend: getTrend(current.onHold, previous.onHold),
        status: "ON_HOLD",
      },
      {
        title: "Refunded Order",
        value: current.refunded,
        change: getChangeText(current.refunded, previous.refunded),
        trend: getTrend(current.refunded, previous.refunded),
        status: "REFUNDED",
      },
    ] satisfies Item[];
  }, [current, previous]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <StatCard key={it.title} {...it} />
      ))}
    </div>
  );
};
