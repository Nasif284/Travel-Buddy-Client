
import Link from "next/link";

export default function AddBuddyCard() {
  return (
    <Link href={"/matches"}>
      <article className="bg-[#f1f4f1] border-2 border-dashed border-[#bec9c3]/30 rounded-[20px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#005440]/50 transition-colors group">
        <div className="w-16 h-16 bg-[#e0e3e0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#005440]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[#181d1a] font-headline">Add New Buddy</h3>
        <p className="text-sm text-[#3f4944] mt-2 max-w-[180px]">Expand your network and find new travel partners.</p>
      </article>
    </Link>
  );
}
