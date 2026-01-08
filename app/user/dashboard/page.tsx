import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import OrderChart from "@/components/dashboard/OrderChart";
import TopProductsTable from "@/components/dashboard/TopProductsTable";
import { TbAward } from "react-icons/tb";

export default function userDashboard() {
  return (
    <div>
      <DashboardAnalytics />

      {/* --- Charts & Top Products --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-7">
        {/* --- Order Overview Chart Component --- */}
        <div className="lg:col-span-3">
          <OrderChart />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-background-dark p-5 rounded-xl border border-gray-200 dark:border-[#303030]">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <TbAward className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-[#FFFFFF]">
                Top Products
              </h3>
            </div>
            {/* <DateTimePicker
              onDateChange={handleTopProductsDateChange}
              defaultSelection="All Time"
            /> */}
            <div>Date Picker</div>
          </div>
          <TopProductsTable />
        </div>
      </div>
    </div>
  );
}
