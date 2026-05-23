"use client";

import { useState } from "react";
import type { User } from "../interfaces/users.interfaces";
import { useChangeUserStatus, useGetAllUsers } from "../hooks/user-management.hooks";
import { useDebounce } from "@/src/hooks/useDebounce.hook";

import { DataTable } from "@/src/components/table/DataTable";
import { TableFilters } from "@/src/components/table/TableFilters";
import { TablePagination } from "@/src/components/table/TablePagination";
import { UserActionModal } from "./UsersActionModal";
import { buildUserColumns } from "./UserColumns";
import type { UserAction } from "./UsersActionModal";
import type { SortOrder } from "@/src/components/table/TableFilters";

const LIMIT = 5;

const SORT_OPTIONS = [
  { value: "createdAt", label: "Sort by: Joined" },
  { value: "fullName", label: "Sort by: Name" },
  { value: "email", label: "Sort by: Email" },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [joinedFilter, setJoinedFilter] = useState("");
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [actionModal, setActionModal] = useState<{
    userId: string;
    action: UserAction;
  } | null>(null);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGetAllUsers({
    page,
    limit: LIMIT,
    verified: verifiedFilter,
    joined: joinedFilter,
    status: statusFilter,
    search: debouncedSearch,
    sortBy, 
    sortOrder,
  });

  const changeStatus = useChangeUserStatus();


  function handleRowClick(user: User) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(user.id) ? next.delete(user.id) : next.add(user.id);
      return next;
    });
  }

  function handleAction(userId: string, action: UserAction) {
    setActionModal({ userId, action });
  }

  async function handleConfirm(userId: string, action: UserAction, reason: string) {
    await changeStatus.mutateAsync({ userId, action, reason });
    setActionModal(null);
  }

  function handleSortBy(value: string) {
    setSortBy(value);
    setPage(1);
  }

  function handleSortOrder(value: SortOrder) {
    setSortOrder(value);
    setPage(1);
  }

  const columns = buildUserColumns(openMenuId, setOpenMenuId, handleAction);
  const users = data?.data?.users ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;

  const filters = [
    {
      value: statusFilter,
      onChange: (v: string) => {
        setStatusFilter(v);
        setPage(1);
      },
      options: [
        { value: "", label: "Status: All" },
        { value: "active", label: "Active" },
        { value: "suspended", label: "Suspended" },
        { value: "banned", label: "Banned" },
      ],
    },
    {
      value: verifiedFilter,
      onChange: (v: string) => {
        setVerifiedFilter(v);
        setPage(1);
      },
      options: [
        { value: "", label: "Verified: Any" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      value: joinedFilter,
      onChange: (v: string) => {
        setJoinedFilter(v);
        setPage(1);
      },
      options: [
        { value: "", label: "Joined: Any time" },
        { value: "1y", label: "Last one year" },
        { value: "30d", label: "Last 30 days" },
        { value: "7d", label: "Last 7 days" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-3xl font-black text-[#1c1c1a] tracking-tighter">All users</h2>
        <p className="text-sm font-medium text-[#3f4944] mt-1">{total} users registered on Travel Buddy</p>
      </div>

      <TableFilters
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="Search by name, email, phone..."
        filters={filters}
        sort={{
          sortBy,
          sortOrder,
          onSortBy: handleSortBy,
          onSortOrder: handleSortOrder,
          options: SORT_OPTIONS,
        }}
      />

      <DataTable columns={columns} data={users} rowKey={(u) => u.id} isLoading={isLoading} emptyMessage="No users match your filters." onRowClick={handleRowClick} selectedIds={selectedIds} />
      
      {!isLoading && total > 0 && <TablePagination page={page} totalPages={totalPages} total={total} limit={LIMIT} onPageChange={setPage} />}

      {actionModal && <UserActionModal userId={actionModal.userId} action={actionModal.action} onConfirm={handleConfirm} onClose={() => setActionModal(null)} isLoading={changeStatus.isPending} />}
    </div>
  );
}
