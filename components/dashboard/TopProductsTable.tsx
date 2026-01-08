"use client";
import React, { useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";


type SortDirection = "ascending" | "descending";
type SortConfig = { key: string; direction: SortDirection } | null;

type ProductRow = {
  _id: number | string;
  name: string;
  image?: string[];
  price: number;
  quantity: number;
  isSkeleton?: boolean;
};

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  width?: string;
  sortable?: boolean;
  headerClassName?: string;
  renderCell?: (row: T) => React.ReactNode;
};

type TopProductsTableProps = {
  /** Optional: pass real data later. If not passed, component uses FAKE_DATA */
  data?: ProductRow[];
  /** Optional: customize columns later. If not passed, uses default columns */
  columns?: Column<ProductRow>[];
  /** Optional empty state */
  emptyStateComponent?: React.ReactNode;
  /** Optional initial sort */
  initialSort?: { key: keyof ProductRow; direction: SortDirection };
};

const FAKE_DATA: ProductRow[] = [
  {
    _id: 1,
    name: "Apple iPhone 15 Pro Max (256GB)",
    image: ["https://via.placeholder.com/80"],
    price: 1299,
    quantity: 84,
  },
  {
    _id: 2,
    name: "Samsung Galaxy S24 Ultra (512GB)",
    image: ["https://via.placeholder.com/80"],
    price: 1199,
    quantity: 67,
  },
  {
    _id: 3,
    name: "Sony WH-1000XM5 Headphones",
    image: ["https://via.placeholder.com/80"],
    price: 299,
    quantity: 112,
  },
  {
    _id: 4,
    name: "Apple MacBook Air M2 (13-inch)",
    image: ["https://via.placeholder.com/80"],
    price: 999,
    quantity: 45,
  },
  {
    _id: 5,
    name: "Logitech MX Master 3S Mouse",
    image: ["https://via.placeholder.com/80"],
    price: 99,
    quantity: 176,
  },
  
];

const money = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);

const getSortIcon = (sortConfig: SortConfig, accessor: string) => {
  if (!sortConfig || sortConfig.key !== accessor) {
    return (
      <div className="flex flex-col items-center">
        <IoMdArrowDropup className="ml-1 -mb-2 opacity-30" />
        <IoMdArrowDropdown className="ml-1 opacity-30" />
      </div>
    );
  }
  return sortConfig.direction === "ascending" ? (
    <MdOutlineArrowUpward className="ml-1" />
  ) : (
    <MdOutlineArrowDownward className="ml-1" />
  );
};

const defaultColumns: Column<ProductRow>[] = [
  {
    header: "Product",
    accessor: "name",
    width: "55%",
    sortable: true,
    renderCell: (row) =>
      row.isSkeleton ? (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {row.image?.[0] ? (
            <img
              src={row.image[0]}
              alt={row.name}
              className="w-5 h-5 rounded-md object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-700" />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
            {row.name}
          </span>
        </div>
      ),
  },
  {
    header: "Price",
    accessor: "price",
    width: "20%",
    sortable: true,
    renderCell: (row) =>
      row.isSkeleton ? (
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
      ) : (
        <span className="text-gray-600 dark:text-[#E5E5E5]">
          {money(row.price)}
        </span>
      ),
  },
  {
    header: "Orders",
    accessor: "quantity",
    width: "20%",
    sortable: true,
    renderCell: (row) =>
      row.isSkeleton ? (
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4" />
      ) : (
        <span className="text-gray-600 dark:text-[#E5E5E5]">
          {row.quantity}
        </span>
      ),
  },
];

const TopProductsTable: React.FC<TopProductsTableProps> = ({
  data,
  columns,
  emptyStateComponent = (
    <div className="p-5 text-sm text-gray-500 dark:text-gray-400">
      No products found.
    </div>
  ),
  initialSort = { key: "quantity", direction: "descending" },
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: String(initialSort.key),
    direction: initialSort.direction,
  });

  const cols = useMemo(() => columns ?? defaultColumns, [columns]);
  const rows = useMemo(() => data ?? FAKE_DATA, [data]);

  const sortedRows = useMemo(() => {
    if (!rows?.length) return [];
    if (!sortConfig?.key) return rows;

    const key = sortConfig.key as keyof ProductRow;

    return [...rows].sort((a, b) => {
      const av = (a as any)[key];
      const bv = (b as any)[key];

      // number sort
      if (typeof av === "number" && typeof bv === "number") {
        return sortConfig.direction === "ascending" ? av - bv : bv - av;
      }

      // string sort
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      return sortConfig.direction === "ascending"
        ? as.localeCompare(bs)
        : bs.localeCompare(as);
    });
  }, [rows, sortConfig]);

  const requestSort = (accessor: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== accessor) {
        return { key: accessor, direction: "ascending" };
      }
      return {
        key: accessor,
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
  };

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 dark:border-[#303030] rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100/60 dark:bg-[#1C1C1C]">
            <tr>
              {cols.map((col) => (
                <th
                  key={String(col.accessor)}
                  scope="col"
                  className="p-3 text-left text-md font-bold text-gray-600 dark:text-gray-400"
                  style={{ width: col.width || "auto" }}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => requestSort(String(col.accessor))}
                      className="flex items-center cursor-pointer"
                      type="button"
                    >
                      {col.header}
                      {getSortIcon(sortConfig, String(col.accessor))}
                    </button>
                  ) : (
                    <div className={col.headerClassName || ""}>{col.header}</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-[#303030]">
            {sortedRows.length > 0 ? (
              sortedRows.map((row, rowIndex) => (
                <tr
                  key={String(row._id ?? rowIndex)}
                  className="dark:hover:bg-gray-800/40 hover:bg-gray-50 transition-colors duration-200"
                >
                  {cols.map((col) => (
                    <td
                      key={String(col.accessor)}
                      className="p-3 text-md font-medium text-gray-800 dark:text-gray-200"
                    >
                      {col.renderCell
                        ? col.renderCell(row)
                        : (row as any)[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={cols.length}>{emptyStateComponent}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet */}
      <div className="block lg:hidden">
        {sortedRows.length > 0 ? (
          <div className="space-y-3">
            {sortedRows.map((row, rowIndex) => {
              const rowId = row._id ?? rowIndex;

              // Primary = first column, others on right
              const nonActionCols = cols.filter((c) => c.header !== "Actions");
              const primaryCol = nonActionCols[0];
              const otherCols = nonActionCols.slice(1);

              return (
                <div
                  key={String(rowId)}
                  className="p-3 border border-gray-200 dark:border-[#303030] rounded-xl bg-white dark:bg-[#0b0b0b] shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 truncate">
                        {primaryCol?.header}
                      </div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {primaryCol?.renderCell
                          ? primaryCol.renderCell(row)
                          : (row as any)[primaryCol?.accessor as any]}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1">
                      {otherCols.map((col) => (
                        <div key={String(col.accessor)} className="text-right">
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {col.header}
                          </div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {col.renderCell
                              ? col.renderCell(row)
                              : (row as any)[col.accessor]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions block (optional) */}
                  {cols.some((c) => c.header === "Actions") && (
                    <div className="pt-2 mt-2 border-t border-gray-100 dark:border-[#222] flex items-center justify-end">
                      {cols.map((col) =>
                        col.header === "Actions" ? (
                          <div
                            key={String(col.accessor)}
                            className="flex items-center gap-2"
                          >
                            {col.renderCell
                              ? col.renderCell(row)
                              : (row as any)[col.accessor]}
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4">{emptyStateComponent}</div>
        )}
      </div>
    </div>
  );
};

export default TopProductsTable;
