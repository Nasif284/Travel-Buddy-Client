"use client";

import { useState } from "react";

export type UserAction = "ban" | "suspend" | "activate";

interface UserActionModalProps {
  userId: string;
  action: UserAction;
  onConfirm: (userId: string, action: UserAction, reason: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const config: Record<UserAction, { title: string; needsReason: boolean; confirmClass: string }> = {
  ban: {
    title: "Ban user",
    needsReason: true,
    confirmClass: "bg-red-600 hover:bg-red-700",
  },
  suspend: {
    title: "Suspend user",
    needsReason: true,
    confirmClass: "bg-orange-500 hover:bg-orange-600",
  },
  activate: {
    title: "Activate user",
    needsReason: false,
    confirmClass: "bg-[#005440] hover:bg-[#004030]",
  },
};

export function UserActionModal({ userId, action, onConfirm, onClose, isLoading }: UserActionModalProps) {
  const [reason, setReason] = useState("");
  const cfg = config[action];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl mx-4">
        <h2 className="text-xl font-bold mb-2 text-[#1c1c1a]">{cfg.title}</h2>

        {cfg.needsReason && (
          <>
            <p className="text-sm text-zinc-500 mb-4">Please provide a reason.</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter reason..." className="w-full border border-zinc-200 rounded-xl p-3 min-h-[120px] outline-none focus:ring-2 focus:ring-[#005440]/20 text-sm text-[#1c1c1a] resize-none" />
          </>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} disabled={isLoading} className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-semibold text-[#1c1c1a] hover:bg-zinc-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(userId, action, reason)} disabled={isLoading || (cfg.needsReason && !reason.trim())} className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50 ${cfg.confirmClass}`}>
            {isLoading ? "Processing…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
