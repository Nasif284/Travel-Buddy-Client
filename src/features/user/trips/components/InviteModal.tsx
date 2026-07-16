import { useState } from "react";

export default function InviteModal({ onClose, onInvite, isSending = false }: { onClose: () => void; onInvite: (email: string) => void; isSending?: boolean }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onInvite(value.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181d1a]/60 backdrop-blur-md px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-[#181d1a] font-headline">Invite member</h3>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f4f1] transition-colors text-[#3f4944]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" autoFocus required value={value} onChange={(e) => setValue(e.target.value)} placeholder="friend@email.com" className="w-full px-4 py-3 bg-[#f4f5f4] border border-transparent rounded-xl text-sm font-medium text-[#181d1a] focus:outline-none focus:border-[#0f6e56] placeholder:text-[#bec9c3] transition-all" />
          </div>
          <button type="submit" disabled={isSending} className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:bg-[#005440] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {isSending ? "Sending..." : "Send invite"}
          </button>
        </form>
      </div>
    </div>
  );
}
