"use client";

import { useState } from "react";
import { DUMMY_DETAIL, DUMMY_QUEUE, STATUS_FILTERS } from "../utils/data";
import QueueCard from "../components/QueueCard";
import VerificationDetail from "../components/VerificationsDetails";
import { Icons } from "../utils/icons";
import { useApproveVerification, useGetVerificationDetails, useGetVerificationQueue, useRejectVerification, useRequestResubmission } from "../hooks/hooks";
import { StatusCode, VerificationQueueItemDTO } from "../interfaces/interfaces";

export default function AdminVerificationsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data: queue, isLoading } = useGetVerificationQueue({ tab: statusFilter as StatusCode, search, page: 1, limit: 10 });
  const queueItems = queue?.data?.items;
  const approve = useApproveVerification()
  const reject = useRejectVerification()
  const requestResubmission = useRequestResubmission()

  const [selectedId, setSelectedId] = useState<string>(queue?.data?.items[0]?.verificationId);

  const { data: detailsData, isLoading: detailsLoading } = useGetVerificationDetails(selectedId);
  const detail = detailsData?.data;
  async function handleApprove() {
    if (!selectedId) return;
    approve.mutate(selectedId)
  }

  async function handleReject(reason:string) {
    if (!selectedId) return;
    reject.mutate({id:selectedId,reason})
  }

  async function handleRequestResubmit(reason: string) {
    if (!selectedId) return;
    requestResubmission.mutate({id:selectedId,reason})
  }

  if (isLoading || detailsLoading) {
    return <h1>Loading...</h1>;
  }
  const pendingCount = queueItems?.length;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Queue sidebar ─────────────────────────────── */}
      <aside className="w-[320px] flex-shrink-0 flex flex-col border-r border-[#bec9c3]/20 bg-[#f6f3ef] h-[calc(100vh-64px)] sticky top-12">
        {/* Queue header */}
        <div className="p-4 border-b border-[#bec9c3]/20 space-y-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#1c1c1a]">
              Queue
              {pendingCount > 0 && <span className="ml-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{pendingCount}</span>}
            </span>
            <span className="text-[10px] text-[#6f7a74]">{queueItems.length} items</span>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a74]">{Icons.search}</span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-9 pr-3 py-2 bg-white border border-[#bec9c3]/30 rounded-lg text-xs focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] outline-none transition-all placeholder:text-[#bec9c3] text-[#1c1c1a]" />
          </div>

          {/* Status filter pills */}
          <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all
                      ${statusFilter === f.value ? "bg-[#005440] text-white" : "bg-white text-[#6f7a74] hover:bg-[#e5e2de]"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Queue list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 [&::-webkit-scrollbar]:hidden">
          {queueItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#6f7a74]">
              <div className="w-12 h-12 bg-[#e5e2de] rounded-full flex items-center justify-center mb-3 opacity-40">{Icons.id}</div>
              <p className="text-sm font-bold opacity-40">No verifications found</p>
            </div>
          ) : (
            queueItems.map((item: VerificationQueueItemDTO) => <QueueCard key={item.verificationId} item={item} selected={selectedId === item.verificationId} onClick={() => setSelectedId(item.verificationId)} />)
          )}
        </div>
      </aside>

      {/* ── Detail panel ───────────────────────────────── */}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)]  overflow-hidden">
        {detail ? (
          <VerificationDetail detail={detail} onApprove={handleApprove} onReject={handleReject} onRequestResubmit={handleRequestResubmit} isActioning={requestResubmission.isPending || reject.isPending || approve.isPending} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#6f7a74]">
            <div className="w-20 h-20 bg-[#e5e2de] rounded-full flex items-center justify-center mb-4 opacity-30">{Icons.eye}</div>
            <p className="text-lg font-bold opacity-40">Select a verification</p>
            <p className="text-sm opacity-30 mt-1">Choose an item from the queue to review it</p>
          </div>
        )}
      </main>
    </div>
  );
}
