"use client";
import React from "react";

export default function TicketDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-background-light dark:bg-background-dark-2 rounded"></div>
          <div className="h-6 w-72 bg-background-light dark:bg-background-dark-2 rounded"></div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 w-24 bg-background-light dark:bg-background-dark-2 rounded ml-auto"></div>
          <div className="h-4 w-20 bg-background-light dark:bg-background-dark-2 rounded ml-auto"></div>
        </div>
      </div>

      <div className="h-24 bg-background-light dark:bg-background-dark-2 rounded"></div>

      <div>
        <div className="h-4 w-40 bg-background-light dark:bg-background-dark-2 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-12 bg-background-light dark:bg-background-dark-2 rounded"></div>
          <div className="h-12 bg-background-light dark:bg-background-dark-2 rounded"></div>
        </div>
      </div>

      <div>
        <div className="h-4 w-32 bg-background-light dark:bg-background-dark-2 rounded mb-2"></div>
        <div className="h-20 bg-background-light dark:bg-background-dark-2 rounded"></div>
      </div>

      <div className="flex justify-end">
        <div className="h-10 w-32 bg-background-light dark:bg-background-dark-2 rounded"></div>
      </div>
    </div>
  );
}
