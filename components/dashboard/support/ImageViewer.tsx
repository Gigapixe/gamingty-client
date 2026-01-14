"use client";
import React from "react";
import CloseIcon from "@/public/icons/CloseIcon";

interface ImageViewerProps {
  src: string | null;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({
  src,
  alt = "image",
  isOpen,
  onClose,
}: ImageViewerProps) {
  if (!isOpen || !src) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-50 max-w-[95%] max-h-[90vh]">
        <button
          aria-label="Close image viewer"
          className="absolute -top-4 -right-4 p-2 bg-primary rounded-full shadow"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <img src={src} alt={alt} className="max-w-full max-h-[90vh] rounded" />
      </div>
    </div>
  );
}
