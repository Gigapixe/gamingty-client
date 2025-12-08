"use client";

import VectorIcon from "@/public/icons/VectorIcon";
import { useCategoryStore } from "@/zustand/store";

export default function CategoryToggleButton() {
  return (
    <button
      onClick={() => useCategoryStore.getState().openCategory()}
      className="flex justify-between bg-primary-dark md:py-4 items-center p-2 lg:px-4 w-full md:w-auto hover:bg-primary-dark/60"
    >
      <div className="flex items-center gap-2">
        <VectorIcon className="text-white" />
        <h1 className="text-white">All Categories</h1>
      </div>
    </button>
  );
}
