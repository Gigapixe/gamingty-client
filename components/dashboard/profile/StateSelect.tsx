"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { State } from "country-state-city";
import ArrowIcon from "@/public/icons/ArrowIcon";

interface StateSelectProps {
  countryCode?: string; // ISO 2-letter code
  value?: string; // state/region name
  onChange?: (v: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function StateSelect({
  countryCode,
  value,
  onChange,
  disabled = false,
  className = "",
}: StateSelectProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Find states for the given countryCode using `country-state-city`
  // State.getStatesOfCountry returns an array of state objects (name, isoCode, etc.)
  const regions = useMemo(() => {
    if (!countryCode) return [] as string[];

    try {
      const states = State.getStatesOfCountry(
        String(countryCode).toUpperCase()
      );
      if (!states || states.length === 0) return [] as string[];

      // map to state names
      return states.map((s: any) => s.name) as string[];
    } catch (e) {
      // defensive: if the package throws or returns unexpected data
      return [] as string[];
    }
  }, [countryCode]);

  // Filter regions by search
  const filtered = regions.filter((region) =>
    region.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch(""); // Reset search when closing
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // If there are no regions, render a simple disabled input/display
  if (!regions || regions.length === 0) {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          readOnly
          value={value || "N/A"}
          className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded bg-background dark:bg-background-dark text-[var(--color-text)] dark:text-[var(--color-text-light)]"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative w-full border border-border-light dark:border-border-dark bg-background dark:bg-background-dark py-[7px] px-3 rounded ${
        className || ""
      }`}
      role="combobox"
      aria-expanded={open}
    >
      <div
        className={`flex items-center cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-label={value || "Select State/Region"}
      >
        <span>{value || "Select State/Region"}</span>
        <span className="ml-auto transition-all" aria-hidden="true">
          {open ? (
            <ArrowIcon className="rotate-90" />
          ) : (
            <ArrowIcon className="rotate-0" />
          )}
        </span>
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-background dark:bg-background-dark border border-border-light dark:border-border-dark rounded shadow max-h-60 overflow-auto left-0 top-10">
          <input
            type="text"
            className="w-full px-2 py-1 border-b border-border-light dark:border-border-dark outline-none"
            placeholder="Search state/region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            aria-label="Search states"
          />
          <ul className="max-h-48 overflow-auto" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-2 py-2 text-gray-500" role="option">
                No states found
              </li>
            ) : (
              filtered.map((region) => (
                <li
                  key={region}
                  className={`flex items-center px-2 py-2 cursor-pointer hover:bg-primary/20 ${
                    value === region ? "bg-primary" : ""
                  }`}
                  onClick={() => {
                    onChange?.(region);
                    setOpen(false);
                    setSearch(""); // Reset search on selection
                  }}
                  role="option"
                  aria-selected={value === region}
                >
                  <span>{region}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
