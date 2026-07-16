export default function DeleteConfirmModal({ label, onConfirm, onCancel }: { label: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181d1a]/60 backdrop-blur-md px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-14 h-14 bg-[#ffdad6] rounded-full flex items-center justify-center mx-auto mb-5 text-[#ba1a1a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-[#181d1a] mb-2 font-headline">Delete task?</h3>
        <p className="text-sm text-[#3f4944] mb-8 leading-relaxed">
          <span className="font-semibold text-[#181d1a]">&ldquo;{label}&rdquo;</span> will be permanently removed from the checklist.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-12 border-2 border-[#bec9c3] text-[#3f4944] font-bold rounded-xl hover:bg-[#f1f4f1] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 h-12 bg-[#ba1a1a] text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
