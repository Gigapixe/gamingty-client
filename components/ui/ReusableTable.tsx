"use client";

import React, { useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export type SortDirection = "ascending" | "descending";

export type SortConfig = {
  key: string;
  direction: SortDirection;
};

export type TableColumn<T extends Record<string, any>> = {
  header: string;
  accessor: keyof T | string; // allow dynamic keys
  width?: string;
  sortable?: boolean;
  headerClassName?: string;
  renderCell?: (row: T) => React.ReactNode;
};

type ReusableTableProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  data: T[];
  sortConfig?: SortConfig;
  requestSort?: (key: string) => void;
  emptyStateComponent?: React.ReactNode;
  /**
   * Optional: define unique row key (default uses row._id, row.id, or index)
   */
  getRowId?: (row: T, index: number) => string | number;
};

export default function ReusableTable<T extends Record<string, any>>({
  columns,
  data,
  sortConfig,
  requestSort,
  emptyStateComponent = null,
  getRowId,
}: ReusableTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (rowId: string | number) => {
    const key = String(rowId);
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSortIcon = (accessor: string) => {
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

  const hasActionsColumn = useMemo(
    () => columns.some((c) => c.header === "Actions"),
    [columns]
  );

  const nonActionCols = useMemo(
    () => columns.filter((c) => c.header !== "Actions"),
    [columns]
  );

  const mainCols = useMemo(() => nonActionCols.slice(0, 2), [nonActionCols]);
  const detailCols = useMemo(() => nonActionCols.slice(2), [nonActionCols]);

  const resolveRowId = (row: T, index: number) => {
    if (getRowId) return getRowId(row, index);

    const anyRow = row as any;
    return anyRow?._id ?? anyRow?.id ?? index;
  };

  const getCellValue = (row: T, accessor: TableColumn<T>["accessor"]) => {
    const key = String(accessor);
    return (row as any)?.[key];
  };

  return (
    <div className="w-full">
      {/* Desktop / large */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 dark:border-[#303030] rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100/60 dark:bg-[#1C1C1C]">
            <tr>
              {columns.map((col) => {
                const accessor = String(col.accessor);
                return (
                  <th
                    key={accessor}
                    scope="col"
                    className="p-3 text-left text-md font-bold text-gray-600 dark:text-gray-400"
                    style={{ width: col.width || "auto" }}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => requestSort?.(accessor)}
                        className="flex items-center cursor-pointer"
                      >
                        {col.header}
                        {getSortIcon(accessor)}
                      </button>
                    ) : (
                      <div className={col.headerClassName || ""}>
                        {col.header}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-[#303030]">
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => {
                const rowId = resolveRowId(row, rowIndex);
                return (
                  <tr
                    key={String(rowId)}
                    className="dark:hover:bg-gray-800/40 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {columns.map((col) => {
                      const accessor = String(col.accessor);
                      return (
                        <td
                          key={accessor}
                          className="p-3 text-md font-medium text-gray-800 dark:text-gray-200"
                        >
                          {col.renderCell
                            ? col.renderCell(row)
                            : String(getCellValue(row, col.accessor) ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>{emptyStateComponent}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet */}
      <div className="block lg:hidden">
        {data && data.length > 0 ? (
          <div className="space-y-3">
            {data.map((row, rowIndex) => {
              const rowId = resolveRowId(row, rowIndex);
              const isOpen = expandedRows[String(rowId)] || false;

              return (
                <div
                  key={String(rowId)}
                  className="p-3 border border-gray-200 dark:border-[#303030] rounded-xl bg-white dark:bg-[#0b0b0b] shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-center">
                    {mainCols.map((col) => {
                      const accessor = String(col.accessor);
                      return (
                        <React.Fragment key={accessor}>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">
                            {col.header}
                          </div>
                          <div className="text-xs font-medium text-gray-800 dark:text-gray-200 break-words">
                            {col.renderCell
                              ? col.renderCell(row)
                              : String(getCellValue(row, col.accessor) ?? "")}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {isOpen && detailCols.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 items-center mt-1">
                      {detailCols.map((col) => {
                        const accessor = String(col.accessor);
                        return (
                          <React.Fragment key={accessor}>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">
                              {col.header}
                            </div>
                            <div className="text-xs font-medium text-gray-800 dark:text-gray-200 break-words">
                              {col.renderCell
                                ? col.renderCell(row)
                                : String(getCellValue(row, col.accessor) ?? "")}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}

                  {detailCols.length > 0 && (
                    <button
                      type="button"
                      className="w-full flex items-center justify-end text-xs text-gray-500 dark:text-gray-400 py-1 mt-1 mb-1"
                      onClick={() => toggleRow(rowId)}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? (
                        <FiChevronUp className="mr-1" />
                      ) : (
                        <FiChevronDown className="mr-1" />
                      )}
                      {isOpen ? "Hide" : "Show More"}
                    </button>
                  )}

                  {/* Actions always at bottom */}
                  {hasActionsColumn && (
                    <div className="pt-2 mt-2 border-t border-gray-100 dark:border-[#222] flex items-center justify-end">
                      {columns.map((col) => {
                        if (col.header !== "Actions") return null;
                        const accessor = String(col.accessor);

                        return (
                          <div
                            key={accessor}
                            className="flex items-center gap-2"
                          >
                            {col.renderCell
                              ? col.renderCell(row)
                              : String(getCellValue(row, col.accessor) ?? "")}
                          </div>
                        );
                      })}
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
}
