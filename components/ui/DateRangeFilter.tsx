"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

export type DateRange = {
  from: string | null;
  to: string | null;
};

type DateRangeFilterProps = {
  value?: DateRange;
  onChange: (range: DateRange) => void;

  /** optional external label override */
  label?: string;

  /** when nothing selected */
  defaultLabel?: string;

  /** if you want to start with a preset selected */
  defaultPresetKey?: PresetKey | null;

  disabled?: boolean;
  weekStartsOn?: 0 | 1;
  className?: string;
};

type PresetKey =
  | "today"
  | "yesterday"
  | "thisweek"
  | "last7"
  | "thismonth"
  | "last30"
  | "last90"
  | "lastmonth"
  | "thisyear"
  | "lastyear";

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
  const day = d.getDay();
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

const formatHumanRange = (range: DateRange) => {
  const f = range.from ? new Date(range.from) : null;
  const t = range.to ? new Date(range.to) : null;

  const fmt = (d: Date) =>
    `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`;

  if (f && t) return `${fmt(f)} - ${fmt(t)}`;
  if (f) return `From ${fmt(f)}`;
  if (t) return `To ${fmt(t)}`;
  return "";
};

type Preset = { key: PresetKey; label: string; from: string; to: string };

const buildPresets = (weekStartsOn: 0 | 1): Preset[] => {
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

  const lastYearBase = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  const lastYearFrom = startOfYear(lastYearBase);
  const lastYearTo = endOfYear(lastYearBase);

  const to = (d: Date) => toISODate(d);

  return [
    { key: "today", label: "Today", from: to(todayFrom), to: to(todayTo) },
    {
      key: "yesterday",
      label: "Yesterday",
      from: to(yesterdayFrom),
      to: to(yesterdayTo),
    },
    {
      key: "thisweek",
      label: "This Week",
      from: to(thisWeekFrom),
      to: to(thisWeekTo),
    },
    {
      key: "last7",
      label: "Last 7 Days",
      from: to(last7From),
      to: to(last7To),
    },
    {
      key: "thismonth",
      label: "This Month",
      from: to(thisMonthFrom),
      to: to(thisMonthTo),
    },
    {
      key: "last30",
      label: "Last 30 Days",
      from: to(last30From),
      to: to(last30To),
    },
    {
      key: "last90",
      label: "Last 90 Days",
      from: to(last90From),
      to: to(last90To),
    },
    {
      key: "lastmonth",
      label: "Last Month",
      from: to(lastMonthFrom),
      to: to(lastMonthTo),
    },
    {
      key: "thisyear",
      label: "This Year",
      from: to(thisYearFrom),
      to: to(thisYearTo),
    },
    {
      key: "lastyear",
      label: "Last Year",
      from: to(lastYearFrom),
      to: to(lastYearTo),
    },
  ];
};

const sameRange = (a?: DateRange, b?: DateRange) =>
  (a?.from ?? null) === (b?.from ?? null) &&
  (a?.to ?? null) === (b?.to ?? null);

export default function DateRangeFilter({
  value,
  onChange,
  label,
  defaultLabel = "All Time",
  defaultPresetKey = null,
  disabled,
  weekStartsOn = 1,
  className = "",
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);

  // draft is what user edits inside popover
  const [draft, setDraft] = useState<DateRange>({
    from: value?.from ?? null,
    to: value?.to ?? null,
  });

  // store selected preset if matches, otherwise custom/null
  const [selectedPresetKey, setSelectedPresetKey] = useState<
    PresetKey | "custom" | null
  >(defaultPresetKey);

  const ref = useRef<HTMLDivElement>(null);

  const presets = useMemo(() => buildPresets(weekStartsOn), [weekStartsOn]);

  // sync draft when parent value changes
  useEffect(() => {
    setDraft({ from: value?.from ?? null, to: value?.to ?? null });

    // detect preset vs custom
    const match = presets.find(
      (p) => p.from === (value?.from ?? null) && p.to === (value?.to ?? null)
    );
    if (match) setSelectedPresetKey(match.key);
    else if (value?.from || value?.to) setSelectedPresetKey("custom");
    else setSelectedPresetKey(defaultPresetKey ?? null);
  }, [value?.from, value?.to, presets, defaultPresetKey]);

  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selectedLabel = useMemo(() => {
    if (label) return label;

    if (!value?.from && !value?.to) return defaultLabel;

    const preset = presets.find(
      (p) => p.from === value?.from && p.to === value?.to
    );
    if (preset) return preset.label;

    // custom
    return formatHumanRange(value ?? { from: null, to: null }) || "Custom";
  }, [label, value, defaultLabel, presets]);

  const applyPreset = (p: Preset) => {
    const next = clampRangeOrder(p.from, p.to);
    setDraft(next);
    setSelectedPresetKey(p.key);
  };

  const handleDone = () => {
    const next = clampRangeOrder(draft.from, draft.to);

    // set custom/preset label detection
    const match = presets.find((p) => p.from === next.from && p.to === next.to);
    setSelectedPresetKey(
      match ? match.key : next.from || next.to ? "custom" : null
    );

    // avoid noisy re-renders
    if (!sameRange(next, value)) onChange(next);

    setOpen(false);
  };

  const handleClear = () => {
    const cleared = { from: null, to: null };
    setDraft(cleared);
    setSelectedPresetKey(null);
    if (!sameRange(cleared, value)) onChange(cleared);
    setOpen(false);
  };

  const onDraftFromChange = (v: string) => {
    setSelectedPresetKey("custom");
    setDraft((d) => ({ ...d, from: v || null }));
  };
  const onDraftToChange = (v: string) => {
    setSelectedPresetKey("custom");
    setDraft((d) => ({ ...d, to: v || null }));
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={[
          "min-w-50",
          "inline-flex items-center justify-between gap-2",
          "px-4 py-2 rounded-full border text-sm",
          "bg-white dark:bg-background-dark",
          "border-gray-200 dark:border-[#303030]",
          "text-gray-700 dark:text-gray-200",
          "hover:bg-gray-50 dark:hover:bg-[#1c1c1c]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "min-w-40]",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2">
          <BiCalendar className="text-primary" size={20} />
          <span className="truncate">{selectedLabel}</span>
        </span>
        <span
          className={`text-gray-400 ${
            open ? "rotate-180 duration-300" : "duration-300"
          }`}
        >
          <IoIosArrowDown />
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Date range filter"
          className={[
            // ✅ responsive: centered on small, right aligned on md+
            "fixed sm:absolute",
            "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0",
            "top-auto sm:top-full",
            "mt-2",
            "z-50",
            // ✅ responsive widths
            "w-[92vw] max-w-105 sm:w-95",
            "rounded-xl border shadow-xl",
            "bg-white dark:bg-background-dark",
            "border-gray-200 dark:border-[#303030]",
          ].join(" ")}
        >
          <div className="p-4 space-y-4">
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  From
                </label>
                <input
                  type="date"
                  value={draft.from ?? ""}
                  onChange={(e) => onDraftFromChange(e.target.value)}
                  className={[
                    "w-full rounded-lg border px-3 py-2 text-sm",
                    "bg-white dark:bg-[#0f0f0f]",
                    "border-gray-200 dark:border-[#303030]",
                    "text-gray-900 dark:text-gray-100",
                    "outline-none focus:ring-2 focus:ring-emerald-400/40",
                  ].join(" ")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  To
                </label>
                <input
                  type="date"
                  value={draft.to ?? ""}
                  onChange={(e) => onDraftToChange(e.target.value)}
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presets.map((p) => {
                  const active =
                    selectedPresetKey === p.key ||
                    (draft.from === p.from && draft.to === p.to);

                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className={[
                        "rounded-lg px-3 py-2 text-xs font-semibold",
                        "transition-colors",
                        active
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-[#1c1c1c] dark:hover:bg-[#242424] dark:text-gray-200",
                      ].join(" ")}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-[#303030]" />

          {/* Footer */}
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
