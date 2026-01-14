import { getUserSupportTickets } from "@/services/supportService";
import TicketListClient from "@/components/customer/support/TicketListClient";

export default async function TicketListUi() {
  try {
    const ticketList: any = await getUserSupportTickets({ page: 1, size: 10 });
    const data = (ticketList?.data ?? []).map((t: any) => ({
      ...t,
      // format createdAt on the server with explicit locale to avoid hydration mismatch
      createdAtFormatted: t?.createdAt
        ? new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(t.createdAt))
        : "",
    }));
    const meta = ticketList?.meta ?? {
      page: 1,
      size: 10,
      total: data.length,
      totalPage: 1,
    };
    return <TicketListClient initialData={data} meta={meta} />;
  } catch (error) {
    console.error("Error fetching ticket list:", error);
    return (
      <TicketListClient
        initialData={[]}
        meta={{ page: 1, size: 10, total: 0, totalPage: 1 }}
      />
    );
  }
}
