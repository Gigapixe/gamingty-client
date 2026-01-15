
"use client";

import { FiUsers } from "react-icons/fi";
import PaginationControls from "./PaginationControls";
import ReusableTable from "@/components/ui/ReusableTable";

export default function ReferralTableCard({
  title,
  loading,
  error,
  tableRef,
  columns,
  data,
  sortConfig,
  requestSort,
  emptyState,
  pagination,
}: any) {
  return (
    <div
      className="p-6 rounded-xl bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700"
      ref={tableRef}
    >
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FiUsers className="text-xl text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10">Loading...</div>
      ) : error ? (
        <div className="text-center p-10 text-red-500">{error}</div>
      ) : (
        <>
          <ReusableTable
            columns={columns}
            data={data}
            sortConfig={sortConfig}
            requestSort={requestSort}
            emptyStateComponent={emptyState}
          />
          {data?.length > 0 && <PaginationControls {...pagination} />}
        </>
      )}
    </div>
  );
}
