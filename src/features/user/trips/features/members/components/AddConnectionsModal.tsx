import { useMemo, useState } from "react";
import Avatar from "./Avatar";
import { useGetConnections } from "@/src/features/user/matches-connections/hooks/connection.hooks";
import { Connection } from "@/src/features/user/matches-connections/interfaces/profile-listing.interface";
import Link from "next/link";
import { useAddMembers } from "../hooks/hooks";
import { Member } from "../interfaces/interfaces";

export default function AddConnectionsModal({ groupId, onClose, members }: { groupId: string; onClose: () => void; members: Member[] }) {
  const { data, isLoading } = useGetConnections();
  console.log(members)
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const connectionsData = data?.data?.connections;
  const memberIds = useMemo(() => new Set(members.map((m) => m.userId)), [members]);
  const connections = useMemo(() => connectionsData?.filter((c: Connection) => !memberIds.has(c.userId)) ?? [], [connectionsData, memberIds]);
  const add = useAddMembers();
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => connections?.filter((c: Connection) => c.fullName.toLowerCase().includes(search.toLowerCase())), [search, connections]);

  const selectedList = connections?.filter((c: Connection) => selected.has(c.userId));
  const count = selected.size;

  const handleAdd = () => {
    add.mutate(
      { id: groupId, members: [...selected] },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
    console.log("Adding members:", [...selected]);
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.45)" }}>
        <h2>Loading...</h2>
        <h3 className="text-[17px] font-semibold text-[#181d1a] m-0">Add connections</h3>
      </div>
    );
  }
  if (!isLoading && connections?.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#eef8f4] flex items-center justify-center text-[#0f6e56]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <h3 className="mt-6 text-2xl font-black text-[#181d1a]">No Connections Yet</h3>

          <p className="mt-3 text-[#3f4944] leading-relaxed">You do not have any travel connections yet. Connect with travelers first, then invite them directly to your trip group.</p>

          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/matches"
              className="
              h-12
              rounded-xl
              bg-[#0f6e56]
              text-white
              font-semibold
              flex items-center justify-center
              hover:bg-[#005440]
              transition-all
            "
            >
              Find Travel Buddies
            </Link>

            <button
              onClick={onClose}
              className="
              h-12
              rounded-xl
              border
              border-[#d4dbd6]
              text-[#181d1a]
              font-semibold
              hover:bg-[#f5f7f6]
              transition-all
            "
            >
              Use Invite Link Instead
            </button>
          </div>

          <p className="mt-4 text-xs text-[#6f7a74]">You can still invite anyone using your trip invite link.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.45)" }}>
      <div className="bg-white w-full max-w-lg rounded-[20px] overflow-hidden border border-[#e8eae8]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5">
          <div>
            <h3 className="text-[17px] font-semibold text-[#181d1a] m-0">Add connections</h3>
            <p className="text-[13px] text-[#6f7a74] mt-1.5 m-0">Select travelers to invite to this trip</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full border border-[#e0e3e0] flex items-center justify-center text-[#6f7a74] hover:bg-[#f5f7f6] transition-colors flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Search */}
          <div className="relative mb-5">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca8a3]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search connections…" className="w-full h-10 pl-9 pr-4 rounded-[var(--radius,8px)] border border-[#e0e3e0] bg-[#f7f8f7] text-sm text-[#181d1a] placeholder:text-[#9ca8a3] outline-none focus:border-[#0f6e56] transition-colors" />
          </div>

          {/* Selected chips */}
          {selectedList?.length > 0 && (
            <div className="mb-5 pb-5 border-b border-[#e8eae8]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[.06em] text-[#9ca8a3]">Selected ({count})</span>
                <button onClick={() => setSelected(new Set())} className="text-[12px] font-medium text-[#ba1a1a] hover:opacity-80 transition-opacity">
                  Clear all
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {selectedList?.map((c: Connection) => (
                  <button key={c.id} onClick={() => toggle(c.id)} className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full border border-[#d4dbd6] bg-white hover:border-[#0f6e56]/40 transition-colors">
                    <Avatar src={c.avatarUrl} alt={c.fullName} size={22} />
                    <span className="text-[12px] font-medium text-[#181d1a]">{c.fullName.split(" ")[0]}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-[#9ca8a3] ml-0.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List */}
          <div className="flex flex-col gap-0.5 max-h-[280px] overflow-y-auto">
            {filtered?.map((c: Connection) => {
              const sel = selected.has(c.userId);
              return (
                <button key={c.id} onClick={() => toggle(c.userId)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border transition-all text-left ${sel ? "bg-[#f0faf6] border-[#0f6e56]/20" : "border-transparent hover:bg-[#f7f8f7]"}`}>
                  <Avatar src={c.avatarUrl} alt={c.fullName} size={40} ring={sel} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#181d1a] m-0">{c.fullName}</p>
                    <p className="text-[12px] text-[#9ca8a3] m-0 mt-0.5">Travel Buddy connection</p>
                  </div>
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${sel ? "bg-[#0f6e56] border-0" : "border border-[#c8d0cc] bg-white"}`}>
                    {sel && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
            {filtered?.length === 0 && <p className="text-sm text-[#9ca8a3] text-center py-8">No connections match your search.</p>}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2.5 mt-6 pt-5 border-t border-[#e8eae8]">
            <button onClick={onClose} className="h-9 px-4 rounded-[var(--radius,8px)] border border-[#d4dbd6] bg-white text-sm font-medium text-[#3f4944] hover:bg-[#f7f8f7] transition-colors">
              Cancel
            </button>
            <button onClick={handleAdd} disabled={count === 0} className={`h-9 px-5 rounded-[var(--radius,8px)] text-sm font-medium text-white transition-all ${count > 0 ? "bg-[#0f6e56] hover:bg-[#005440] cursor-pointer" : "bg-[#0f6e56]/30 cursor-not-allowed"}`}>
              {count > 0 ? `Add ${count} member${count > 1 ? "s" : ""}` : "Add member"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
