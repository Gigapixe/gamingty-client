import MyOrders from "@/components/dashboard/Order/MyOrder";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm">Loading orders...</div>}>
      <MyOrders />
    </Suspense>
  );
}
