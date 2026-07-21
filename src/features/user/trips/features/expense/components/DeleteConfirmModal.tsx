export default function DeleteConfirmModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#181d1a]/60 backdrop-blur-md px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center">
        <h3 className="text-xl font-black text-[#181d1a] mb-2 font-headline">Delete expense?</h3>
        <p className="text-sm text-[#3f4944] mb-8 leading-relaxed">
          <span className="font-semibold text-[#181d1a]">&ldquo;{title}&rdquo;</span> will be permanently removed and all split records will be lost.
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
