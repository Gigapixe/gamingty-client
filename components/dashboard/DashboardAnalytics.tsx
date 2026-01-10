import { StatCard } from "../ui/StatCard";

export const DashboardAnalytics: React.FC = () => {
  const items = [
    {
      title: "Total Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Delivered Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Failed Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Pending Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Processing Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Cancelled Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "On Hold Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
    {
      title: "Refunded Order",
      value: 0,
      change: "No change vs last day",
      trend: "Neutral" as const,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <StatCard key={it.title} {...it} />
        ))}
      </div>
    </div>
  );
};
