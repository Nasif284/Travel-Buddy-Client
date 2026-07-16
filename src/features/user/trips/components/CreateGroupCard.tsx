export default function CreateGroupCard({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group py-16 flex flex-col items-center justify-center  rounded-2xl border-2 border-dashed border-[#bec9c3] bg-[#f1f4f1] hover:bg-[#e5e9e5] hover:border-[#005440] transition-all duration-300">
      <div className="w-16 h-16 rounded-full bg-[#c9eadb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#005440]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <span className="text-xl font-bold text-[#005440] font-headline">Create New Group</span>
      <p className="text-sm text-[#3f4944] mt-2 px-8 text-center">Start a new adventure and invite your travel squad to join.</p>
    </button>
  );
}