"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SortOrder, TableFilters } from "@/src/components/table/TableFilters";
import { Column, DataTable } from "@/src/components/table/DataTable";
import { TableActionMenu } from "@/src/components/table/TableActionMenu";
import { TablePagination } from "@/src/components/table/TablePagination";
import { useGetAllTripGroups } from "../hooks/hooks";
import { GroupData } from "../interfaces/interfaces";
import { useDebounce } from "@/src/hooks/debounce.hook";
import Link from "next/link";

const Icons = {
  trips: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

function formatDateRange(from: Date, to: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${new Date(from).toLocaleDateString("en-US", opts)} – ${new Date(to).toLocaleDateString("en-US", opts)}`;
}

function formatBudgetStyle(style: string): string {
  return style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
}

const LIMIT = 10;

const SORT_OPTIONS = [
  { value: "createdAt", label: "Newest first" },
  { value: "dateFrom", label: "Departure date" },
];

const TRIP_STATUS_OPTIONS = [
  { value: "", label: "All Trips" },
  { value: "completed", label: "Completed Trips" },
  { value: "active", label: "Active Trips" },
  { value: "upcoming", label: "Upcoming Trips" },
];
const BUDGET_STYLE_OPTIONS = [
  { value: "", label: "All" },
  { value: "budget", label: "Budget" },
  { value: "moderate", label: "Moderate" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

export default function AdminTripsPage() {
  const router = useRouter();

  // ── Filter/sort/page state ──────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [tripStatus, setTripStatus] = useState("");
  const [budgetStyle,setBudgetStyle] = useState("")
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const { data, isLoading } = useGetAllTripGroups({
      search:debouncedSearch,
      budgetStyle,
      tripStatus,
      sortBy,
      sortOrder,
      page,
      limit: LIMIT,
    });

  const groups = data?.data?.groups ?? [];

  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages

  // const handleMenuToggle = useCallback((id: string | null) => setOpenMenuId(id), []);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleTripStatus(val: string) {
    setTripStatus(val);
    setPage(1);
  }
 function handleBudgetStyle(val: string) {
   setBudgetStyle(val);
   setPage(1);
 }
  const columns: Column<GroupData>[] = [
    {
      key: "name",
      header: "Trip Name",
      render: (row: GroupData) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#e5e2de]">{row.coverUrl ? <img src={row.coverUrl} alt={row.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#3f4944]">{Icons.trips}</div>}</div>
          <span className="text-sm font-bold text-[#1c1c1a] truncate max-w-[180px]">{row.name}</span>
        </div>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      render: (row: GroupData) => <span className="text-sm text-[#3f4944] font-medium">{row.destination}</span>,
    },
    {
      key: "members",
      header: "Members",
      render: (row: GroupData) => (
        <div className="flex items-center">
          <span className="ml-2 text-xs font-semibold text-[#3f4944]">
            {row.members.length} member{row.members.length !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      render: (row: GroupData) => <span className="text-xs font-medium text-[#3f4944] whitespace-nowrap">{formatDateRange(row.dateFrom, row.dateTo)}</span>,
    },
    {
      key: "budgetStyle",
      header: "Budget Style",
      render: (row: GroupData) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
          ${row.budgetStyle === "luxury" ? "bg-amber-100 text-amber-700" : row.budgetStyle === "mid" ? "bg-blue-100 text-blue-700" : "bg-[#c9eadb] text-[#005440]"}`}
        >
          {formatBudgetStyle(row.budgetStyle)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (row: GroupData) => (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/trips/${row.id}`} className="bg-[#005440]/5 hover:bg-[#005440]/10 text-[#005440] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
            View details
          </Link>
          {/* <TableActionMenu
            rowId={row.id}
            openId={openMenuId}
            onToggle={handleMenuToggle}
            items={[
              {
                label: "View details",
                onClick: () => router.push(`/admin/trips/${row.id}`),
              },
              {
                label: "Edit trip",
                onClick: () => router.push(`/admin/trips/${row.id}/edit`),
              },
              {
                label: "Delete trip",
                onClick: () => {
                  // trigger delete confirmation
                  console.log("delete", row.id);
                },
                className: "text-[#ba1a1a] hover:bg-[#ffdad6]/30",
              },
            ]}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <main className="flex-grow p-8 pt-20 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#1c1c1a]">All trips</h2>
          <p className="text-[#3f4944] font-medium mt-1">{isLoading ? "Loading…" : `${total.toLocaleString()} total group trips`}</p>
        </div>

        {/* Bulk action (shows when rows selected) */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 bg-[#005440]/5 border border-[#005440]/20 rounded-xl px-4 py-2.5">
            <span className="text-xs font-bold text-[#005440]">{selectedIds.size} selected</span>
            <button
              onClick={() => {
                /* bulk delete */
              }}
              className="text-xs font-bold text-[#ba1a1a] hover:underline"
            >
              Delete selected
            </button>
            <button onClick={() => setSelectedIds(new Set())} className="text-xs text-[#3f4944] hover:text-[#1c1c1a]">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6">
        <TableFilters
          searchValue={search}
          onSearchChange={handleSearch}
          searchPlaceholder="Search trip by name, destination..."
          filters={[
            {
              value: tripStatus,
              onChange: handleTripStatus,
              options: TRIP_STATUS_OPTIONS,
            },
            {
              value: budgetStyle,
              onChange: handleBudgetStyle,
              options: BUDGET_STYLE_OPTIONS,
            },
          ]}
          sort={{
            sortBy,
            sortOrder,
            onSortBy: (v) => {
              setSortBy(v);
              setPage(1);
            },
            onSortOrder: setSortOrder,
            options: SORT_OPTIONS,
          }}
        />
      </div>

      {/* Table */}
      <DataTable<GroupData> columns={columns} data={groups} rowKey={(row: GroupData) => row.id} isLoading={isLoading} emptyMessage="No trips found matching your search." selectedIds={selectedIds} onRowClick={(row) => router.push(`/admin/trips/${row.id}`)} />

      {/* Pagination */}
      {!isLoading && total > 0 && <TablePagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />}
    </main>
  );
}
