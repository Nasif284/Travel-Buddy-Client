"use client";

import { useState } from "react";
import type { ExpenseBalanceMemberDTO, ExpenseBalanceTransactionDTO } from "../interface/interface"

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

function Avatar({ url, name, size = 56, ring = false }: { url?: string | null; name: string; size?: number; ring?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={{ width: size, height: size }} className={`rounded-full overflow-hidden flex-shrink-0 ${ring ? "ring-2 ring-[#0f6e56]" : ""}`}>
      {url ? <img src={url} alt={name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440] font-bold text-sm">{initials}</div>}
    </div>
  );
}

type SettleState = "idle" | "loading" | "success";

interface Props {
  payer: ExpenseBalanceMemberDTO; // person paying (usually current user)
  transaction: ExpenseBalanceTransactionDTO; // the specific PAY transaction
  onClose: () => void;
  onSettled: () => void;
}

export default function SettleUpModal({ payer, transaction, onClose, onSettled }: Props) {
  const [amount, setAmount] = useState(transaction.amount.toLocaleString("en-IN"));
  const [note, setNote] = useState("");
  const [state, setState] = useState<SettleState>("idle");

  const handleSettle = async () => {
    setState("loading");
    // TODO: call settle API: POST /api/trips/{tripId}/expenses/settle
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
    setTimeout(() => {
      onSettled();
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-[#e5e9e5]">
          <h2 className="text-xl font-bold text-[#181d1a] font-headline">Settle Up</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f4f1] transition-colors text-[#6f7a74]" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-8 space-y-8">
          {/* Payer → Receiver relationship */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar url={payer.avatarUrl} name={payer.fullName} size={56} ring />
              <span className="text-sm font-semibold text-[#181d1a] font-headline">{payer.fullName}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#005440" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#9ca8a3]">Paying</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar url={transaction.avatarUrl} name={transaction.fullName} size={56} />
              <span className="text-sm font-semibold text-[#181d1a] font-headline">{transaction.fullName}</span>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6f7a74] mb-2 px-1">Amount to Settle</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#6f7a74]">₹</span>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9,]/g, ""))} className="w-full h-20 pl-10 pr-6 bg-[#f1f4f1] rounded-xl border-none text-4xl font-black text-[#0f6e56] focus:ring-2 focus:ring-[#0f6e56]/20 outline-none transition-all" />
            </div>
            <p className="text-xs text-[#9ca8a3] mt-1.5 px-1">Full amount owed: {fmt(transaction.amount)}</p>
          </div>

          {/* Note */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6f7a74] mb-2 px-1">
              Note <span className="normal-case font-medium">(Optional)</span>
            </label>
            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for this payment…" className="w-full bg-[#f1f4f1] rounded-xl border-none p-4 text-sm resize-none focus:ring-2 focus:ring-[#0f6e56]/20 outline-none transition-all" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-[#f1f4f1] flex items-center gap-3 border-t border-[#e5e9e5]">
          <button onClick={onClose} className="flex-1 h-12 rounded-xl bg-white border border-[#d4dbd6] text-[#3f4944] font-bold hover:bg-[#f7f8f7] transition-all">
            Cancel
          </button>
          <button onClick={handleSettle} disabled={state !== "idle"} className={`flex-[2] h-12 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${state === "success" ? "bg-[#476459]" : "bg-[#0f6e56] hover:bg-[#005440] active:scale-[0.98]"} disabled:opacity-80 disabled:cursor-not-allowed`}>
            {state === "loading" && (
              <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {state === "loading" && "Processing…"}
            {state === "success" && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sent successfully
              </>
            )}
            {state === "idle" && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Settle up
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
