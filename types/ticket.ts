export interface Ticket {
  _id: string;
  ticketId?: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

export interface TicketListResponse {
  success: boolean;
  data: {
    tickets: Ticket[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalDocs: number;
      pageSize: number;
    };
  };
  message?: string;
}
