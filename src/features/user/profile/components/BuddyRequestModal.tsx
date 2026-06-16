import { useState } from "react";

export function BuddyRequestModal({ isOpen, onClose, onSend, user }: BuddyRequestModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-3xl font-black text-[#181d1a]">Send Buddy Request</h2>

          <button onClick={onClose} className="w-11 h-11 rounded-full bg-[#f1f4f1] flex items-center justify-center hover:bg-[#e5e9e5]">
            ✕
          </button>
        </div>

        {/* User Card */}
        <div className="px-6">
          <div className="bg-[#f1f4f1] rounded-2xl p-4 flex items-center gap-4">
            <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover" />

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6f7a74] font-bold">Request To</p>

              <h3 className="text-2xl font-black text-[#0f6e56]">{user.name}</h3>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="p-6">
          <label className="block text-sm font-bold mb-3 text-[#181d1a]">Personalized note</label>

          <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Hi ${user.name.split(" ")[0]}! I came across your profile and would love to connect as a travel buddy...`} className="w-full rounded-2xl bg-[#f1f4f1] p-4 resize-none outline-none border border-transparent focus:border-[#0f6e56]" />
        </div>

        {/* Footer */}
        <div className="bg-[#f7faf6] px-6 py-5 flex justify-between">
          <button onClick={onClose} className="font-bold text-[#0f6e56]">
            Cancel
          </button>

          <button
            onClick={() => {
              onSend(message);
              onClose();
            }}
            className="px-8 py-3 bg-[#0f6e56] text-white rounded-xl font-bold shadow-lg hover:opacity-90"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
