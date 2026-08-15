import { Column, DataTable } from "@/src/components/table/DataTable";
import { GroupData } from "../interfaces/users.interfaces";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import TripStatusBadge from "./TripStatusBadge";
import { TableActionMenu } from "@/src/components/table/TableActionMenu";
import { useGetUserTripGroups } from "../hooks/user-management.hooks";

const Icons = {
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  group: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  trips: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

function formatDateRange(from: Date, to: Date): string {
  const fmt = (d: Date) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${fmt(from)} – ${fmt(to)}`;
}

export default function TripsTab({ userId }: { userId: string }) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const handleMenu = useCallback((id: string | null) => setOpenMenu(id), []);

  const { data: tripData, isLoading } = useGetUserTripGroups(userId);
  const trips = tripData?.data?.groups;

  const columns: Column<GroupData>[] = [
    {
      key: "trip",
      header: "Trip",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#c9eadb]/30 flex items-center justify-center flex-shrink-0 text-[#005440]">{row.coverUrl ? <img src={row.coverUrl} alt={row.name} className="w-full h-full object-cover" /> : Icons.trips}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-[#1c1c1a]">{row.name}</h4>
              <TripStatusBadge dateFrom={row.dateFrom} dateTo={row.dateTo} />
            </div>
            <p className="text-xs text-[#3f4944] font-medium">{row.destination}</p>
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-[#3f4944] font-medium">
          {Icons.calendar}
          <span>{formatDateRange(row.dateFrom, row.dateTo)}</span>
        </div>
      ),
    },
    {
      key: "members",
      header: "Members",
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-[#3f4944] font-medium">
          {Icons.group}
          <span>{row.members.length} members</span>
        </div>
      ),
    },
    {
      key: "budget",
      header: "Budget Style",
      render: (row) => <span className="px-2.5 py-1 bg-[#c9eadb] text-[#4d6b5f] text-[10px] font-bold uppercase rounded-full capitalize">{row.budgetStyle}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/trips/${row.id}`);
            }}
            className="p-2 text-[#6f7a74] hover:text-[#005440] hover:bg-[#c9eadb]/20 rounded-lg transition-colors"
            title="View trip"
          >
            {Icons.eye}
          </button>
          {/* <TableActionMenu
            rowId={row.id}
            openId={openMenu}
            onToggle={handleMenu}
            items={[
              { label: "View trip details", onClick: () => router.push(`/admin/trips/${row.id}`) },
            ]}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <section className="py-6">
      <DataTable<GroupData> columns={columns} data={trips} rowKey={(r) => r.id} isLoading={isLoading} emptyMessage="This user has no trips yet." onRowClick={(row) => router.push(`/admin/trips/${row.id}`)} />
    </section>
  );
}
