"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type DateRange = {
  from: string | null;
  to: string | null;  
};

type DateRangeFilterProps = {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  label?: string;                
  defaultLabel?: string;          
  disabled?: boolean;
  weekStartsOn?: 0 | 1;         
  className?: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const toISODate = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const parseISODate = (s: string | null | undefined) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
};

const clampRangeOrder = (from: string | null, to: string | null): DateRange => {
  if (!from || !to) return { from, to };
  const a = parseISODate(from);
  const b = parseISODate(to);
  if (!a || !b) return { from, to };
  return a.getTime() <= b.getTime() ? { from, to } : { from: to, to: from };
};

const startOfWeek = (date: Date, weekStartsOn: 0 | 1) => {
  const d = new Date(date);
  const day = d.getDay(); // 0..6 (Sun..Sat)
  const diff = (day - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfWeek = (date: Date, weekStartsOn: 0 | 1) => {
  const s = startOfWeek(date, weekStartsOn);
  const e = new Date(s);
  e.setDate(s.getDate() + 6);
  e.setHours(23, 59, 59, 999);
  return e;
};

const startOfMonth = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfMonth = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  d.setHours(23, 59, 59, 999);
  return d;
};

const startOfYear = (date: Date) => {
  const d = new Date(date.getFullYear(), 0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfYear = (date: Date) => {
  const d = new Date(date.getFullYear(), 11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const formatHuman = (range: DateRange) => {
  const f = range.from ? new Date(range.from) : null;
  const t = range.to ? new Date(range.to) : null;
  const fmt = (d: Date) =>
    `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`;
  if (f && t) return `${fmt(f)} - ${fmt(t)}`;
  if (f) return `From ${fmt(f)}`;
  if (t) return `To ${fmt(t)}`;
  return "";
};

export default function DateRangeFilter({
  value,
  onChange,
  label,
  defaultLabel = "All Time",
  disabled,
  weekStartsOn = 1,
  className = "",
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);

  // local draft so user can edit then press Done
  const [draft, setDraft] = useState<DateRange>({
    from: value?.from ?? null,
    to: value?.to ?? null,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft({ from: value?.from ?? null, to: value?.to ?? null });
  }, [value?.from, value?.to]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const displayText = useMemo(() => {
    if (label) return label;
    const human = formatHuman(value ?? { from: null, to: null });
    return human || defaultLabel;
  }, [label, value, defaultLabel]);

  const applyQuick = (from: Date, to: Date) => {
    const next = clampRangeOrder(toISODate(from), toISODate(to));
    setDraft(next);
  };

  const quick = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const todayFrom = new Date(now);
    const todayTo = new Date(now);

    const yesterdayFrom = addDays(now, -1);
    const yesterdayTo = addDays(now, -1);

    const thisWeekFrom = startOfWeek(now, weekStartsOn);
    const thisWeekTo = endOfWeek(now, weekStartsOn);

    const last7From = addDays(now, -6);
    const last7To = now;

    const last30From = addDays(now, -29);
    const last30To = now;

    const last90From = addDays(now, -89);
    const last90To = now;

    const thisMonthFrom = startOfMonth(now);
    const thisMonthTo = endOfMonth(now);

    const lastMonthBase = addDays(startOfMonth(now), -1);
    const lastMonthFrom = startOfMonth(lastMonthBase);
    const lastMonthTo = endOfMonth(lastMonthBase);

    const thisYearFrom = startOfYear(now);
    const thisYearTo = endOfYear(now);

    const lastYearBase = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const lastYearFrom = startOfYear(lastYearBase);
    const lastYearTo = endOfYear(lastYearBase);

    return [
      { key: "today", label: "Today", from: todayFrom, to: todayTo },
      { key: "yesterday", label: "Yesterday", from: yesterdayFrom, to: yesterdayTo },
      { key: "thisweek", label: "This Week", from: thisWeekFrom, to: thisWeekTo },
      { key: "last7", label: "Last 7 Days", from: last7From, to: last7To },
      { key: "thismonth", label: "This Month", from: thisMonthFrom, to: thisMonthTo },
      { key: "last30", label: "Last 30 Days", from: last30From, to: last30To },
      { key: "last90", label: "Last 90 Days", from: last90From, to: last90To },
      { key: "lastmonth", label: "Last Month", from: lastMonthFrom, to: lastMonthTo },
      { key: "thisyear", label: "This Year", from: thisYearFrom, to: thisYearTo },
      { key: "lastyear", label: "Last Year", from: lastYearFrom, to: lastYearTo },
    ];
  }, [weekStartsOn]);

  const handleDone = () => {
    const next = clampRangeOrder(draft.from, draft.to);
    onChange(next);
    setOpen(false);
  };

  const handleClear = () => {
    const cleared = { from: null, to: null };
    setDraft(cleared);
    onChange(cleared);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={[
          "w-full lg:w-auto",
          "inline-flex items-center justify-between gap-2",
          "px-4 py-2 rounded-full border text-sm",
          "bg-white dark:bg-background-dark",
          "border-gray-200 dark:border-[#303030]",
          "text-gray-700 dark:text-gray-200",
          "hover:bg-gray-50 dark:hover:bg-[#1c1c1c]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "min-w-40",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="truncate">{displayText}</span>
        <span className="text-gray-400">▾</span>
      </button>

      {/* Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Date range filter"
          className={[
            "absolute right-0 mt-2 z-50",
            "w-85 max-w-[95vw]",
            "rounded-xl border shadow-xl",
            "bg-white dark:bg-background-dark",
            "border-gray-200 dark:border-[#303030]",
          ].join(" ")}
        >
          <div className="p-4 space-y-4">
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  From
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={draft.from ?? ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, from: e.target.value || null }))
                    }
                    className={[
                      "w-full rounded-lg border px-3 py-2 text-sm",
                      "bg-white dark:bg-[#0f0f0f]",
                      "border-gray-200 dark:border-[#303030]",
                      "text-gray-900 dark:text-gray-100",
                      "outline-none focus:ring-2 focus:ring-emerald-400/40",
                    ].join(" ")}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  To
                </label>
                <input
                  type="date"
                  value={draft.to ?? ""}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, to: e.target.value || null }))
                  }
                  className={[
                    "w-full rounded-lg border px-3 py-2 text-sm",
                    "bg-white dark:bg-[#0f0f0f]",
                    "border-gray-200 dark:border-[#303030]",
                    "text-gray-900 dark:text-gray-100",
                    "outline-none focus:ring-2 focus:ring-emerald-400/40",
                  ].join(" ")}
                />
              </div>
            </div>

            {/* Quick Select */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Quick Select
              </p>

              <div className="grid grid-cols-3 gap-2">
                {quick.map((q) => (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => applyQuick(q.from, q.to)}
                    className={[
                      "rounded-lg px-3 py-2 text-xs font-semibold",
                      "bg-gray-100 hover:bg-gray-200",
                      "dark:bg-[#1c1c1c] dark:hover:bg-[#242424]",
                      "text-gray-700 dark:text-gray-200",
                      "transition-colors",
                    ].join(" ")}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-[#303030]" />

          {/* Footer buttons */}
          <div className="p-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClear}
              className={[
                "inline-flex items-center justify-center gap-2",
                "px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-red-50 hover:bg-red-100 text-red-600",
                "dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-200",
              ].join(" ")}
            >
              <span className="text-base leading-none">×</span>
              Clear
            </button>

            <button
              type="button"
              onClick={handleDone}
              className={[
                "ml-auto",
                "inline-flex items-center justify-center",
                "px-5 py-2 rounded-lg text-sm font-semibold",
                "bg-emerald-500 hover:bg-emerald-600 text-white",
              ].join(" ")}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
