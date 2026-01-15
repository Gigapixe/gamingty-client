
"use client";


import AffiliateStatCard from "./AffiliateStatCard";


export default function StatsGrid({
  stats,
  loading,
}: {
  stats: any;
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AffiliateStatCard title="Pending Referrals" value={stats.pendingCount} change="+1.03%" loading={loading} />
      <AffiliateStatCard title="Completed Referrals" value={stats.completedCount} change="+1.03%" loading={loading} />
      <AffiliateStatCard title="Cancelled Referrals" value={stats.cancelledCount} change="+1.03%" loading={loading} />
      <AffiliateStatCard title="Total Referrals" value={stats.totalReferrals} change="+1.03%" loading={loading} />
      <AffiliateStatCard title="Total Earnings (Lifetime)" value={`$${stats.totalEarningsLifetime.toFixed(2)}`} change="Lifetime" isLifetime loading={loading} />
      <AffiliateStatCard title="Total Payouts" value={`$${stats.totalPayoutsLifetime.toFixed(2)}`} change="Lifetime" isLifetime loading={loading} />
      <AffiliateStatCard title="Total Link Visits" value={stats.totalVisits} change="+1.03%" loading={loading} />
      <AffiliateStatCard title="Conversion Rate" value={`${stats.conversionRate}%`} change="+1.03%" loading={loading} />
    </div>
  );
}
