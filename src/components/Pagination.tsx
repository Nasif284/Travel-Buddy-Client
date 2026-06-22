"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "../assets/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          flex items-center
          px-3 py-2
          rounded-xl
          border border-[#d9dfdb]
          bg-white
          text-[#181d1a]
          hover:border-[#0f6e56]
          hover:text-[#0f6e56]
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          text-[14px]
        "
      >
        <ChevronLeftIcon />
        Previous
      </button>

      <span className="text-[12px] font-medium text-[#6f7a74] min-w-[100px] text-center">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          flex items-center
          px-3 py-2
          rounded-xl
          border border-[#d9dfdb]
          bg-white
          text-[#181d1a]
          hover:border-[#0f6e56]
          hover:text-[#0f6e56]
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          text-[14px]
        "
      >
        Next
        <ChevronRightIcon />
      </button>
    </div>
  );
}
