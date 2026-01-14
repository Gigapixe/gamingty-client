"use client";
import React, { useRef, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import toast from "react-hot-toast";
import { createSupportTicket } from "@/services/supportService";
import ArrowIcon from "@/public/icons/ArrowIcon";
import SelectDropdown from "@/components/ui/SelectDropdown";
import { FiUploadCloud } from "react-icons/fi";

export default function SupportTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const MAX_DESCRIPTION = 1000;
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validate = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!description.trim()) {
      setError("Description is required");
      return false;
    }
    if ([...description.trim()].length > MAX_DESCRIPTION) {
      setError(`Description must be ${MAX_DESCRIPTION} characters or less.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setAttachments(files);
  };

  const handleDragEvents = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLInputElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(isEntering);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const files = Array.from(e.dataTransfer.files) as File[];
    setAttachments(files);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Build FormData to support file uploads
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("priority", priority);
    formData.append("status", "Open");
    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      await createSupportTicket(formData);
      setSuccess(
        "Support ticket created. Our team will get back to you shortly."
      );
      toast.success("Support ticket created successfully.");
      setTitle("");
      setDescription("");
      setPriority("low");
      setAttachments([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setError("Failed to submit ticket. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 md:p-6 bg-background dark:bg-background-dark-2 rounded-lg shadow-md"
    >
      <h1 className="text-lg font-semibold">Open New Ticket</h1>
      <hr className="border-border-light dark:border-border-dark" />
      <Input
        id="ticket-title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md!"
      />

      <div>
        <label
          htmlFor="ticket-desc"
          className="block text-sm font-medium text-text dark:text-text-light mb-2"
        >
          Description
        </label>
        <textarea
          id="ticket-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-border-light dark:border-border-dark bg-background dark:bg-background-dark text-text dark:text-text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          rows={6}
          maxLength={MAX_DESCRIPTION}
          aria-describedby="desc-help"
        />
        <div id="desc-help" className="flex justify-between text-xs mt-1">
          <div className="text-gray-500">
            {[...description.trim()].length} / {MAX_DESCRIPTION}
          </div>
          {[...description.trim()].length >= MAX_DESCRIPTION ? (
            <div className="text-xs text-red-500">
              You have reached the 1000 character limit.
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <SelectDropdown
          id="ticket-priority"
          label="Priority"
          value={priority}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Attachments
        </label>
        <div
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
                  ${
                    dragging
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-emerald-400"
                  }`}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            accept="image/*,.pdf,.doc,.docx"
          />
          <FiUploadCloud className="mx-auto text-4xl text-gray-400" />
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Drag & drop files here or click to browse
          </p>
        </div>
        <div className="mt-2 space-y-1">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {file.name}
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <div className="flex items-center gap-3">
        <Button
          btnType="primary"
          loading={loading}
          type="submit"
          disabled={loading}
          className="px-0! pl-4! pr-1.5!"
        >
          Create Ticket{" "}
          <span className="bg-white p-2 rounded-full">
            <ArrowIcon className="text-black w-3 h-3 p-0.5" />
          </span>
        </Button>
        {/* <Button
          btnType="outline"
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
            setAttachments([]);
            setError(null);
            setSuccess(null);
          }}
        >
          Reset
        </Button> */}
      </div>
    </form>
  );
}
