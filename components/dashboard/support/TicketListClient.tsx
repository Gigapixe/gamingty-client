"use client";
import React, { useEffect, useState } from "react";
import TableComponent, {
  ColumnDefinition,
  TableActions,
} from "@/components/ui/TableComponent";
import {
  getUserSupportTickets,
  getSupportTicketById,
  createSupportTicketResponse,
} from "@/services/supportService";
import TicketDetailSkeleton from "./skeleton/TicketDetailSkeleton";
import MultiImageUpload from "@/lib/MultiImageUpload";
import Button from "@/components/ui/Button";
import BackArrowIcon from "@/public/icons/BackArrowIcon";
import ImageViewer from "./ImageViewer";
import DetailsModal from "@/components/ui/DetailsModal";
import ProfileIcon from "@/public/icons/ProfileIcon";
import ArrowIcon from "@/public/icons/user/ArrowIcon";

type TicketRow = {
  id: number;
  userId?: number;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In_progress" | "Resolved" | "Closed";
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: { id: number; name: string; email?: string; phone?: string };
  responses?: Array<{
    id?: number;
    message: string;
    attachments?: string[];
    createdAt?: string;
    user?: { id?: number; name?: string };
    responseFrom?: string;
  }>;
  createdAtFormatted?: string;
};

interface Props {
  initialData: TicketRow[];
  meta: { page: number; size: number; total: number; totalPage: number };
}

export default function TicketListClient({ initialData, meta }: Props) {
  const [tickets, setTickets] = useState<{
    data: TicketRow[];
    meta: Props["meta"];
  }>({ data: initialData, meta });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(meta.page || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ticketDetail, setTicketDetail] = useState<TicketRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseAttachments, setResponseAttachments] = useState<string[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const MAX_RESPONSE = 1000;
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openViewer = (src: string) => {
    setViewerSrc(src);
    setIsViewerOpen(true);
  };
  const closeViewer = () => {
    setViewerSrc(null);
    setIsViewerOpen(false);
  };

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const resp: any = await getUserSupportTickets({
        page,
        size: tickets.meta?.size ?? 10,
      });
      setTickets({
        data: resp.data ?? [],
        meta: resp.meta ?? {
          page,
          size: 10,
          total: resp.meta?.total ?? 0,
          totalPage: resp.meta?.totalPage ?? 1,
        },
      });
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData || initialData.length === 0) fetchTickets(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to return consistent badge classes for priority and status
  const getPriorityBadgeClass = (p?: TicketRow["priority"]) => {
    const v = String(p || "");
    return v === "High"
      ? "!bg-red-100 !text-red-800"
      : v === "Medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";
  };

  const getStatusBadgeClass = (s?: TicketRow["status"]) => {
    const v = String(s || "");
    return v === "Open"
      ? "bg-green-100 text-green-800"
      : v === "In_progress"
      ? "bg-yellow-100 text-yellow-800"
      : v === "Resolved"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

  const openDetail = async (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
    setTicketDetail(null);
    setDetailLoading(true);
    setDetailError(null);
    try {
      const resp: any = await getSupportTicketById(String(id));
      const payload = resp?.data ?? resp ?? null;
      setTicketDetail(payload);
    } catch (err) {
      console.error(err);
      setDetailError(err instanceof Error ? err.message : String(err));
    } finally {
      setDetailLoading(false);
    }
  };

  const columns: ColumnDefinition<TicketRow, keyof TicketRow>[] = [
    {
      key: "id",
      header: "ID",
      width: "8%",
      widthMd: "6%",
      widthLg: "6%",
      widthXl: "6%",
      priority: 3,
    },
    {
      key: "title",
      header: "Title",
      width: "36%",
      widthMd: "36%",
      widthLg: "36%",
      widthXl: "36%",
      priority: 1,
      noTruncate: true,
      lineClamp: 2,
    },
    {
      key: "priority",
      header: "Priority",
      width: "12%",
      widthMd: "12%",
      widthLg: "8%",
      widthXl: "8%",
      priority: 2,
      render: (value) => {
        const v = String(value || "");
        const bg = getPriorityBadgeClass(value as TicketRow["priority"]);
        return <span className={`px-2 py-1 rounded text-xs ${bg}`}>{v}</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      width: "12%",
      widthMd: "12%",
      widthLg: "10%",
      widthXl: "10%",
      priority: 2,
      render: (value) => {
        const v = String(value || "");
        const bg = getStatusBadgeClass(value as TicketRow["status"]);
        return (
          <span className={`px-2 py-1 rounded text-xs ${bg}`}>
            {v.replace("_", " ")}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created",
      width: "14%",
      widthMd: "14%",
      widthLg: "16%",
      widthXl: "16%",
      priority: 1,
      render: (_value, row) =>
        row.createdAtFormatted
          ? row.createdAtFormatted
          : _value
          ? new Date(String(_value)).toLocaleString()
          : "-",
    },
  ];

  const actions: TableActions<TicketRow>[] = [
    {
      label: "View",
      render: () => (
        <button className="text-primary hover:underline">View</button>
      ),
      onClick: (row) => openDetail(row.id),
      align: "right",
    },
  ];

  return (
    <div>
      {error ? (
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Error
          </h2>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between gap-2 flex-wrap items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Support Tickets
            </h2>
            <Button
              className="!px-0 !pl-4 !pr-1.5"
              href="/customer/support-tickets"
            >
              Open New Ticket
              <span className="bg-white p-2 rounded-full">
                <ArrowIcon className="text-black w-3 h-3 p-0.5" />
              </span>
            </Button>
          </div>
          <TableComponent
            data={tickets.data}
            columns={columns}
            keyField="id"
            loading={loading}
            emptyMessage="No tickets found."
            stickyHeader={true}
            actions={actions}
            initialPageSize={tickets.meta.size}
            meta={tickets.meta}
            onPageChange={(p) => fetchTickets(p)}
            currentPage={currentPage}
            accordionHeaderKeys={["priority", "status", "createdAt"]}
          />
        </div>
      )}

      <DetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ticket Details"
      >
        {detailLoading ? (
          <TicketDetailSkeleton />
        ) : ticketDetail ? (
          <div className="p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-2 hover:cursor-pointer group"
                >
                  <button>
                    <BackArrowIcon className="text-gray-500 h-3 s-3 dark:group-hover:text-text-light group-hover:text-text" />
                  </button>
                  <div className="text-sm text-gray-500 dark:group-hover:text-text-light group-hover:text-text">
                    Ticket ID: #{ticketDetail.id}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mt-1">
                  {ticketDetail.title}
                </h2>
                <div className="text-xs text-gray-400 mt-1">
                  {ticketDetail.createdAtFormatted
                    ? ticketDetail.createdAtFormatted
                    : ticketDetail.createdAt
                    ? new Date(ticketDetail.createdAt).toLocaleString()
                    : ""}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(
                    ticketDetail.status
                  )}`}
                >
                  {ticketDetail.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getPriorityBadgeClass(
                    ticketDetail.priority
                  )}`}
                >
                  Priority: {ticketDetail.priority}
                </span>
              </div>
            </div>

            <div className="text-sm mt-4">
              <h1 className="font-medium text-sm mb-2">Description</h1>
              <p className="text-xs text-gray-400">
                {ticketDetail.description}
              </p>
            </div>

            {ticketDetail.attachments &&
              ticketDetail.attachments.length > 0 && (
                <div className="mt-4">
                  <div className="font-medium text-sm mb-2">Attachments</div>
                  <div className="flex gap-2">
                    {ticketDetail.attachments.map((a, i) => (
                      <button
                        key={i}
                        type="button"
                        className="inline-block"
                        onClick={() => openViewer(a)}
                      >
                        <img
                          src={a}
                          className="w-28 h-20 object-cover rounded"
                          alt={`att-${i}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-6">
              <h3 className="font-semibold">Responses</h3>
              <div className="space-y-3 my-3">
                {ticketDetail.responses && ticketDetail.responses.length > 0 ? (
                  ticketDetail.responses.map((r, idx) => {
                    const from = String(
                      r.responseFrom || r.user?.name || "User"
                    );
                    const isAdmin =
                      from.toLowerCase() === "admin" ||
                      from.toLowerCase() === "support";
                    const displayName = isAdmin ? "Support Team" : "You";
                    const alignClass = isAdmin
                      ? "justify-start"
                      : "justify-end";
                    const bubbleBg = isAdmin
                      ? "bg-background-light dark:bg-background-dark-2"
                      : "bg-[var(--color-primary)] text-text-light";
                    return (
                      <div key={r.id ?? idx} className={`flex ${alignClass}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${bubbleBg}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-secondary">
                              <ProfileIcon fill="#fff" className="w-4 h-4" />
                            </div>{" "}
                            <div>
                              <div className="text-sm font-medium flex items-center gap-1">
                                {displayName}
                              </div>
                              <div className="text-[10px]">
                                {r.createdAt
                                  ? new Date(r.createdAt).toLocaleString()
                                  : ""}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm whitespace-pre-wrap">
                            {r.message}
                          </div>
                          {r.attachments && r.attachments.length > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {r.attachments.map((a, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => openViewer(a)}
                                >
                                  <img
                                    src={a}
                                    className="w-28 h-20 object-cover rounded"
                                    alt={`resp-att-${i}`}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-gray-500">No responses yet.</div>
                )}
              </div>
            </div>

            {ticketDetail.status !== "Closed" && (
              <div className="mt-4">
                <h4 className="font-medium">Add Response</h4>
                <textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  className="w-full mt-2 p-3 rounded border border-border-light dark:border-border-dark bg-[var(--color-background)] dark:bg-[var(--color-background-dark)] text-[var(--color-text)] dark:text-[var(--color-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-dark)]"
                  rows={4}
                  maxLength={MAX_RESPONSE}
                  aria-describedby="resp-help"
                />
                <div
                  id="resp-help"
                  className="flex justify-between text-xs mt-1"
                >
                  <div className="text-gray-500">
                    {[...responseMessage.trim()].length} / {MAX_RESPONSE}
                  </div>
                  {[...responseMessage.trim()].length >= MAX_RESPONSE ? (
                    <div className="text-xs text-red-500">
                      You have reached the 1000 character limit.
                    </div>
                  ) : null}
                </div>

                <div className="mt-2">
                  <MultiImageUpload
                    onChange={(urls) => setResponseAttachments(urls)}
                  />
                </div>

                {responseLoading ? (
                  <div className="mt-2">Sending...</div>
                ) : (
                  <div className="mt-3 flex justify-end">
                    <Button
                      btnType="primary"
                      className="!px-0 !pl-4 !pr-1.5"
                      onClick={async () => {
                        if (!ticketDetail) return;
                        // validate length
                        if ([...responseMessage.trim()].length === 0) {
                          // don't send empty responses
                          return;
                        }
                        if ([...responseMessage.trim()].length > MAX_RESPONSE) {
                          // should be prevented by maxLength, but double-check
                          return;
                        }
                        setResponseLoading(true);
                        try {
                          await createSupportTicketResponse(
                            String(ticketDetail.id),
                            {
                              message: responseMessage,
                              attachments: responseAttachments,
                            }
                          );
                          const refreshed: any = await getSupportTicketById(
                            String(ticketDetail.id)
                          );
                          setTicketDetail(refreshed?.data ?? refreshed ?? null);
                          setResponseMessage("");
                          setResponseAttachments([]);
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setResponseLoading(false);
                        }
                      }}
                    >
                      Send Response{" "}
                      <span className="bg-white p-2 rounded-full">
                        <ArrowIcon className="text-black w-3 h-3 p-0.5" />
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">No data</div>
        )}
      </DetailsModal>
      <ImageViewer
        src={viewerSrc}
        alt="attachment"
        isOpen={isViewerOpen}
        onClose={closeViewer}
      />
    </div>
  );
}
