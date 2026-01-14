import SupportTicketForm from "@/components/dashboard/support/SupportTicketForm";
import Button from "@/components/ui/Button";

import { FiArrowRight, FiMessageSquare } from "react-icons/fi";

export default function OpenTicket() {
  return (
    <div>
      <div>
        <div className="flex flex-wrap items-center gap-2 justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            <FiMessageSquare className="text-2xl text-gray-700 dark:text-[#FFFFFF]" />
            Support Tickets
          </h1>
          <Button
            btnType="primary"
            className="px-0! pl-4! pr-1.5!"
            href="/customer/ticket-list"
          >
            View All Tickets
            <span className="text-primary bg-white p-1 rounded-full">
              <FiArrowRight className="-rotate-45" />
            </span>
          </Button>
        </div>
        <SupportTicketForm />
      </div>
    </div>
  );
}
