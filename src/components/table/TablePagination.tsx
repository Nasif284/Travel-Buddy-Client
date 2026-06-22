"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/src/assets/icons";


interface TablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ page, totalPages, total, limit, onPageChange }: TablePaginationProps) {
  function getVisiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(page - 1, 1);
    const end = Math.min(page + 1, totalPages);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="p-4 border-t border-[#bec9c3]/10 flex items-center justify-between">
      <span className="text-xs font-medium text-[#3f4944]">
        Showing {from}–{to} of {total}
      </span>

      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => onPageChange(Math.max(1, page - 1))} className="p-1 rounded hover:bg-[#ebe8e4] transition-colors text-[#3f4944] disabled:opacity-40">
          <ChevronLeftIcon />
        </button>

        {page > 2 && (
          <>
            <PageButton n={1} current={page} onClick={onPageChange} />
            <span className="px-1 text-[#3f4944]">…</span>
          </>
        )}

        {getVisiblePages().map((n) => (
          <PageButton key={n} n={n} current={page} onClick={onPageChange} />
        ))}

        {page < totalPages - 1 && (
          <>
            <span className="px-1 text-[#3f4944]">…</span>
            <PageButton n={totalPages} current={page} onClick={onPageChange} />
          </>
        )}

        <button disabled={page === totalPages} onClick={() => onPageChange(Math.min(totalPages, page + 1))} className="p-1 rounded hover:bg-[#ebe8e4] transition-colors text-[#3f4944] disabled:opacity-40">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function PageButton({ n, current, onClick }: { n: number; current: number; onClick: (n: number) => void }) {
  return (
    <button onClick={() => onClick(n)} className={`w-8 h-8 rounded text-xs font-bold transition-colors ${current === n ? "bg-[#005440] text-white" : "hover:bg-[#ebe8e4] text-[#1c1c1a]"}`}>
      {n}
    </button>
  );
}
