import { STATUS_CFG } from "../utils/data";
import { StatusCode, VerificationQueueItemDTO } from "../interfaces/interfaces";
import { Icons } from "../utils/icons";

export function timeAgo(d: Date | string): string {
  const diff = Date.now() - new Date(d).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return `${Math.floor(diff / 60_000)}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function getStatus(code: string) {
  return STATUS_CFG[code as StatusCode] ?? STATUS_CFG.PENDING;
}
export default function QueueCard({ item, selected, onClick }: { item: VerificationQueueItemDTO; selected: boolean; onClick: () => void }) {
  const status = getStatus(item.status.code.toUpperCase());
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all border
        ${selected ? "bg-[#005440]/5 border-[#005440]/30 shadow-sm" : "bg-white border-transparent hover:bg-[#f6f3ef] hover:border-[#bec9c3]/30"}`}
    >
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#c9eadb] flex-shrink-0">{item.user.profilePicture ? <img src={item.user.profilePicture} alt={item.user.fullName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-[#005440]">{item.user.fullName.slice(0, 2).toUpperCase()}</div>}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#1c1c1a] truncate">{item.user.fullName}</p>
          <p className="text-[10px] text-[#6f7a74] truncate">{item.user.email}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.badge}`}>{status.label}</span>
        <span className="text-[10px] text-[#6f7a74] flex items-center gap-1">
          {Icons.clock} {timeAgo(item.submittedAt)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#6f7a74]">
        {Icons.id}
        <span>{item.documentType.name}</span>
        {item.assignedReviewer && (
          <span className="ml-auto flex items-center gap-1">
            {Icons.user} {item.assignedReviewer.fullName}
          </span>
        )}
      </div>
    </button>
  );
}