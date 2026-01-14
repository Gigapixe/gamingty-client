"use client";

import React, { useState, useEffect } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiPaperclip,
  FiDownload,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import dayjs from "dayjs";

// Internal imports
import {
  getSupportTicket,
  getSupportTicketbyId,
  addTicketResponse,
} from "@/services/supportService";
import { Ticket } from "@/types/ticket";

interface TicketResponse {
  _id: string;
  message: string;
  responseFrom: "user" | "admin";
  attachments?: Array<{
    fileName: string;
    fileUrl: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface TicketWithResponses extends Ticket {
  responses?: TicketResponse[];
}

export default function TicketDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [ticket, setTicket] = useState<TicketWithResponses | null>(null);
  const [loading, setLoading] = useState(true);
  const [newResponse, setNewResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      // Try to get ticket by ticketId first (new system)
      const response = await getSupportTicket(id);
      if (response.success) {
        setTicket(response.data);
      } else {
        toast.error(response.message || "Failed to fetch ticket");
      }
    } catch (error: any) {
      // If ticketId fails, try with _id (legacy system)
      try {
        const response = await getSupportTicketbyId(id);
        if (response.success) {
          setTicket(response.data);
        } else {
          toast.error(response.message || "Failed to fetch ticket");
        }
      } catch (fallbackError: any) {
        toast.error(
          fallbackError?.response?.data?.message ||
            fallbackError?.message ||
            "Failed to fetch ticket details"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(files);
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResponse.trim()) {
      toast.error("Please enter a response message");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("message", newResponse.trim());

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await addTicketResponse(id, formData);
      if (response.success) {
        toast.success("Response added successfully!");
        setNewResponse("");
        setAttachments([]);
        fetchTicketDetails(); // Refresh ticket data
      } else {
        toast.error(response.message || "Failed to add response");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add response"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return dayjs(date).format("MMM D, YYYY [at] h:mm A");
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return "";
    const badges: Record<string, string> = {
      High: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700",
      Medium:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700",
      Low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      badges[priority] || badges.Medium
    }`;
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return "";
    const badges: Record<string, string> = {
      Open: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700",
      "In Progress":
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
      Resolved:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700",
      Closed:
        "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      badges[status] || badges.Open
    }`;
  };

  const renderAttachments = (
    attachments?: Array<{ fileName: string; fileUrl: string }>
  ) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium text-gray-700 flex items-center dark:text-gray-300">
          <FiPaperclip className="mr-2" />
          Attachments
        </p>
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <a
              key={index}
              href={attachment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-500 dark:hover:bg-gray-700/50"
            >
              <FiPaperclip className="mr-2 h-4 w-4 text-gray-400 group-hover:text-emerald-500 dark:text-gray-500 dark:group-hover:text-emerald-400" />
              <span className="truncate max-w-37.5 text-sm text-gray-600 group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                {attachment.fileName}
              </span>
              <FiDownload className="ml-2 h-4 w-4 text-gray-400 group-hover:text-emerald-500 dark:text-gray-500 dark:group-hover:text-emerald-400" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Ticket not found
        </h2>
        <button
          onClick={() => router.back()}
          className="mt-4 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-background dark:bg-background-dark-2 rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        {/* Ticket Header */}
        <div className="border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-[#1C1C1C] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Go back"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
                Ticket ID:
              </span>
              <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                #{ticket.ticketId || ticket._id.slice(-6).toUpperCase()}
              </span>
              <span className={getStatusBadge(ticket.status) + " ml-2"}>
                {ticket.status}
              </span>
              <span className={getPriorityBadge(ticket.priority) + " ml-2"}>
                Priority: {ticket.priority}
              </span>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiClock className="text-gray-400 dark:text-gray-500" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white">
            {ticket.title}
          </h1>
          <p className="text-gray-600 leading-relaxed dark:text-gray-300">
            {ticket.description}
          </p>
          {renderAttachments(
            ticket.attachments as unknown as Array<{
              fileName: string;
              fileUrl: string;
            }>
          )}
        </div>

        {/* Responses Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center dark:text-white">
            <FiMessageSquare className="mr-2 text-emerald-500 dark:text-emerald-400" />
            Responses
          </h2>

          <div className="space-y-6">
            {ticket.responses?.map((response, index) => (
              <div
                key={response._id || index}
                className={`p-5 rounded-lg ${
                  response.responseFrom === "user"
                    ? "bg-emerald-50 sm:ml-8 ml-0 sm:mr-0 mr-0 border-l-4 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-600"
                    : "bg-gray-50 sm:mr-8 mr-0 sm:ml-0 ml-0 border-l-4 border-gray-500 dark:bg-gray-700 dark:border-gray-600"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white dark:bg-emerald-600">
                      {response.responseFrom === "user" ? "U" : "A"}
                    </span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {response.responseFrom === "user"
                          ? "You"
                          : "Support Team"}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(response.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    {response.message}
                  </p>
                </div>
                {renderAttachments(response.attachments)}
              </div>
            ))}

            {(!ticket.responses || ticket.responses.length === 0) && (
              <div className="text-center py-12">
                <FiMessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  No responses yet
                </p>
              </div>
            )}
          </div>

          {/* Response Form */}
          {ticket.status?.toLowerCase() !== "closed" && (
            <form
              onSubmit={handleSubmitResponse}
              className="mt-8 border-t border-border-light dark:border-border-dark pt-6"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Add Response
                </label>
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background-dark text-text dark:text-text-light focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:outline-none transition-shadow duration-200"
                  required
                  placeholder="Type your response here..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Attachments (optional)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-background dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors duration-200">
                    <FiPaperclip className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="ml-1">Choose Files</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                  {attachments.length > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {attachments.length} file(s) selected
                    </span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-500 flex items-center dark:text-gray-400"
                    >
                      <FiPaperclip className="mr-2 h-4 w-4" />
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 ${
                  submitting ? "opacity-70 cursor-not-allowed" : ""
                } dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-400`}
              >
                <FiSend className="mr-2 -ml-1 h-5 w-5" />
                {submitting ? "Sending..." : "Send Response"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
