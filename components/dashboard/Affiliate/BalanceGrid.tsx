
"use client";

import BalanceCard from "./BalanceCard";

export default function BalanceGrid({ stats, loading }: { stats: any; loading: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BalanceCard
        title="Balance In Clearance"
        value={`$${stats.clearanceBalance.toFixed(2)}`}
        loading={loading}
        className="bg-[#FEF9C3] dark:bg-yellow-900/30"
        titleClassName="text-yellow-900 dark:text-yellow-200"
        valueClassName="text-yellow-900 dark:text-yellow-100"
      />
      <BalanceCard
        title="Withdrawable Balance"
        value={`$${stats.withdrawableBalance.toFixed(2)}`}
        loading={loading}
        className="bg-[#D1FAE5] dark:bg-emerald-900/30"
        titleClassName="text-emerald-900 dark:text-emerald-200"
        valueClassName="text-emerald-900 dark:text-emerald-100"
      />
    </div>
  );
}
