"use client";

import React, { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  page: number; // 1-based
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;

  className?: string;
  showInfo?: boolean;

  /** how many pages to show around current page */
  siblingCount?: number; // default 1
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const DOTS = "…";

function buildPages(totalPages: number, current: number, siblingCount: number) {
  // Always show: 1, last, current ± siblings
  const totalNumbers = siblingCount * 2 + 5; // 1 + dots + siblings + current + dots + last
  if (totalPages <= totalNumbers) return range(1, totalPages);

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    // 1 2 3 4 5 … last
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    // 1 … last-4 last-3 last-2 last-1 last
    const rightRange = range(totalPages - (2 + siblingCount * 2), totalPages);
    return [1, DOTS, ...rightRange];
  }

  // 1 … mid … last
  const middleRange = range(leftSibling, rightSibling);
  return [1, DOTS, ...middleRange, DOTS, totalPages];
}

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className = "",
  showInfo = true,
  siblingCount = 1,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clamp(page, 1, totalPages);

  const { startItem, endItem } = useMemo(() => {
    const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const end = total === 0 ? 0 : Math.min(safePage * pageSize, total);
    return { startItem: start, endItem: end };
  }, [safePage, pageSize, total]);

  const pages = useMemo(
    () => buildPages(totalPages, safePage, siblingCount),
    [totalPages, safePage, siblingCount]
  );

  const go = (p: number) => onPageChange(clamp(p, 1, totalPages));

  const Btn = ({
    children,
    disabled,
    onClick,
    ariaLabel,
    active,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    ariaLabel?: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        "h-9 min-w-9 px-3 rounded-md border text-sm font-medium",
        "transition-colors",
        "border-gray-200 dark:border-[#303030]",
        active
          ? "bg-emerald-500 text-white border-emerald-500"
          : "bg-white dark:bg-background-dark text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1c1c1c]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      ].join(" ")}
    >
      {children}
    </button>
  );

  return (
    <div
      className={[
        "w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      ].join(" ")}
    >
      {showInfo && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>
              Showing {startItem}-{endItem} of {total} results
            </span>
            <span className="opacity-60">|</span>
            <span>
              Page {safePage} of {totalPages}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <Btn
          ariaLabel="Previous page"
          disabled={safePage <= 1}
          onClick={() => go(safePage - 1)}
        >
          <FiChevronLeft />
        </Btn>

        {pages.map((p, idx) =>
          p === DOTS ? (
            <div
              key={`dots-${idx}`}
              className="h-9 min-w-9 px-2 flex items-center justify-center text-gray-400"
            >
              {DOTS}
            </div>
          ) : (
            <Btn
              key={`p-${p}`}
              active={p === safePage}
              ariaLabel={`Go to page ${p}`}
              onClick={() => go(p as any)}
            >
              {p}
            </Btn>
          )
        )}

        <Btn
          ariaLabel="Next page"
          disabled={safePage >= totalPages}
          onClick={() => go(safePage + 1)}
        >
          <FiChevronRight />
        </Btn>
      </div>
    </div>
  );
}
