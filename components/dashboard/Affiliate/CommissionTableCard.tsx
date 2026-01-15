// src/app/(dashboard)/referrals/_components/CommissionTableCard.tsx
"use client";

import { FiGift } from "react-icons/fi";
import PaginationControls from "./PaginationControls";
import ReusableTable from "@/components/ui/ReusableTable";

export default function CommissionTableCard({
  loading,
  error,
  columns,
  data,
  sortConfig,
  requestSort,
  emptyState,
  pagination,
}: any) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FiGift className="text-xl text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            My Commission History
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10">Loading history...</div>
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
