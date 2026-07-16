import { useEffect, useRef } from "react";
import { MemberMenuProps } from "../interfaces/interfaces";
import { useAuthStore } from "@/src/store/auth.store";
import Link from "next/link";
const Icons = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  userMinus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  crown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M5 20V10l7-6 7 6v10" />
    </svg>
  ),
};
export default function MemberMenu({ member,  isCurrentUserAdmin, onPromote, onRemove, onClose }: MemberMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-10 z-30 bg-white border border-[#bec9c3]/20 rounded-xl shadow-lg shadow-black/10 overflow-hidden min-w-[180px]">
      {isCurrentUserAdmin && member.role === "member" && (
        <button onClick={onPromote} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#181d1a] hover:bg-[#f1f4f1] transition-colors">
          <span className="text-[#005440]">{Icons.crown}</span>
          Make admin
        </button>
      )}

      <Link href={`/profile/${member.userId}`} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#181d1a] hover:bg-[#f1f4f1] transition-colors border-t border-[#bec9c3]/10">
        <span className="text-[#3f4944]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        View profile
      </Link>

      {isCurrentUserAdmin && (
        <button onClick={onRemove} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/30 transition-colors border-t border-[#bec9c3]/10">
          <span>{Icons.userMinus}</span>
          Remove from trip
        </button>
      )}
    </div>
  );
}