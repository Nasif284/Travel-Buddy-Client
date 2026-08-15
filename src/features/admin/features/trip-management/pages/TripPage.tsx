"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Column, DataTable } from "@/src/components/table/DataTable";
import { TablePagination } from "@/src/components/table/TablePagination";
import { useGetGroup } from "../hooks/hooks";
import { GroupMember } from "../interfaces/interfaces";
import { ConfigDetails } from "../components/TripOverview";
import Link from "next/link";

const Icons = {
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  payments: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  personAdd: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  eye: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  personRemove: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
};

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateRange(from: Date, to: Date): string {
  return `${new Date(from).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(to).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

const LIMIT = 10;

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { data: tripData, isLoading } = useGetGroup(params.id as string);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const handleMenuToggle = useCallback((id: string | null) => setOpenMenuId(id), []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const trip = tripData?.data;
  const members = tripData?.data.members;
  console.log(tripData);
  const total = members.length;
  const totalPages = Math.ceil(total / LIMIT);
  const paginated = members.slice((page - 1) * LIMIT, page * LIMIT);

  const columns: Column<GroupMember>[] = [
    {
      key: "name",
      header: "Avatar + Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">{row.avatarUrl ? <img src={row.avatarUrl} alt={row.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#c9eadb] text-[#005440] text-[10px] font-black">{row.name.slice(0, 2).toUpperCase()}</div>}</div>
          <span className="text-sm font-bold text-stone-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight
          ${row.role === "admin" ? "bg-[#c9eadb]/30 text-[#0f6e56]" : "bg-[#ebe8e4] text-stone-600"}`}
        >
          {row.role ?? "member"}
        </span>
      ),
    },
    {
      key: "joinedAt",
      header: "Joined Trip",
      render: (row) => <span className="text-xs text-stone-600">{row.joinedAt ? formatDate(row.joinedAt) : "—"}</span>,
    },
    // {
    //   key: "tripCount",
    //   header: "Trips",
    //   render: (row) => (
    //     <button
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         router.push(`/admin/users/${row.id}`);
    //       }}
    //       className="text-xs font-semibold text-[#005440] underline decoration-[#005440]/30 underline-offset-4 hover:decoration-[#005440] transition-all"
    //     >
    //       {row.tripCount ?? 0} trip{(row.tripCount ?? 0) !== 1 ? "s" : ""}
    //     </button>
    //   ),
    // },
    // {
    //   key: "reportCount",
    //   header: "Reports",
    //   render: (row) => (
    //     <span
    //       className={`text-xs font-bold
    //       ${(row.reportCount ?? 0) > 0 ? "text-[#ba1a1a]" : "text-stone-400"}`}
    //     >
    //       {(row.reportCount ?? 0) > 0 ? `${row.reportCount} report${row.reportCount !== 1 ? "s" : ""}` : "0"}
    //     </span>
    //   ),
    // },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/admin/trips/${row.id}`} className="bg-[#005440]/5 hover:bg-[#005440]/10 text-[#005440] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
            View Profile
          </Link>
        </div>
      ),
    },
  ];

  return (
    <main className="flex-grow p-8 pt-20 overflow-y-auto">
      <div className="relative h-[180px] w-full overflow-hidden">
        <img src={trip.coverUrl} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-white/80 text-sm font-medium tracking-tight">{trip.destination}</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">{trip.name}</h2>
          <p className="text-white/90 font-medium text-sm mt-1">{formatDateRange(trip.dateFrom, trip.dateTo)}</p>
        </div>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        <ConfigDetails trip={trip} />

        <section className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 tracking-tight uppercase">Trip Directory</h3>
              <p className="text-xs text-[#3f4944] mt-1">Manage and audit participant credentials for the {trip.name} expedition.</p>
            </div>
          </div>

          <DataTable<GroupMember> columns={columns} data={paginated} rowKey={(row) => row.id} isLoading={isLoading} emptyMessage="No members in this trip yet." onRowClick={(row) => router.push(`/admin/users/${row.id}`)} />
          {total > 0 && <TablePagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />}
        </section>
      </div>
    </main>
  );
}
