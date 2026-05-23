"use client";

import { Icons } from "../../assets/icons";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
}

// ── New sort types ────────────────────────────────────────────

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  sortBy: string;
  sortOrder: SortOrder;
  onSortBy: (value: string) => void;
  onSortOrder: (value: SortOrder) => void;
  options: FilterOption[]; // the column options to sort by
}

interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters: FilterConfig[];
  sort?: SortConfig; // optional — not every table needs sorting
}

export function TableFilters({ searchValue, onSearchChange, searchPlaceholder = "Search...", filters, sort }: TableFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bec9c3]/10 flex flex-wrap items-center gap-4">
      <div className="relative w-[300px]">
        <span className="absolute inset-y-0 left-3 flex items-center text-[#3f4944]/50">
          <Icons.SearchIcon />
        </span>
        <input type="text" value={searchValue} onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder} className="w-full pl-10 pr-4 py-2 bg-[#f6f3ef] border border-[#bec9c3]/20 rounded-lg text-sm focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all outline-none text-[#1c1c1a]" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter, i) => (
          <select key={i} value={filter.value} onChange={(e) => filter.onChange(e.target.value)} className={`bg-[#f6f3ef] border border-[#bec9c3]/20 rounded-lg text-xs font-semibold py-2 px-3 focus:ring-2 focus:ring-[#005440]/20 outline-none cursor-pointer text-[#1c1c1a] ${filter.className ?? ""}`}>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {sort && (
        <div className="flex items-center gap-2">
          <div className="h-5 w-px bg-[#bec9c3]/40" />

          <select value={sort.sortBy} onChange={(e) => sort.onSortBy(e.target.value)} className="bg-[#f6f3ef] border border-[#bec9c3]/20 rounded-lg text-xs font-semibold py-2 px-3 focus:ring-2 focus:ring-[#005440]/20 outline-none cursor-pointer text-[#1c1c1a]">
            {sort.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button onClick={() => sort.onSortOrder(sort.sortOrder === "asc" ? "desc" : "asc")} title={sort.sortOrder === "asc" ? "Ascending" : "Descending"} className="flex items-center gap-1.5 bg-[#f6f3ef] border border-[#bec9c3]/20 rounded-lg text-xs font-semibold py-2 px-3 text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors cursor-pointer select-none">
            {sort.sortOrder === "asc" ? (
              <>
                <Icons.SortAscIcon />
                <span>Asc</span>
              </>
            ) : (
              <>
                <Icons.SortDescIcon />
                <span>Desc</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* <button className="ml-auto p-2 text-[#3f4944] hover:bg-[#ebe8e4] rounded-lg transition-colors">
        <Icons.FilterIcon />
      </button> */}
    </div>
  );
}
