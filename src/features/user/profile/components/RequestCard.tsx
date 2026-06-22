import { LocationIcon } from "@/src/assets/icons";
import { ConnectionRequest } from "../interfaces/profile.interface";
import Link from "next/link";

interface RequestCardProps {
  request: ConnectionRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export default function RequestCard({ request, onAccept, onDecline }: RequestCardProps) {
  const isAccepted = request.status === "accepted";
  const isDeclined = request.status === "declined";
  const isActioned = isAccepted || isDeclined;

  return (
    <div
      className={`bg-white p-6 rounded-xl border shadow-sm flex gap-8 transition-opacity
        ${isActioned ? "opacity-60" : "opacity-100"}
        ${isAccepted ? "border-[#0f6e56]/30" : isDeclined ? "border-[#bec9c3]/30" : "border-[#bec9c3]/10"}`}
    >
      {/* Profile */}
      <div className="w-44 flex-shrink-0 flex flex-col items-center text-center gap-3">
        <img src={request.sender.avatarUrl!} alt={request.sender.fullName} className="w-20 h-20 rounded-full object-cover shadow-md" />
        <div>
          <h3 className="font-bold text-[#181d1a] font-headline text-sm">{request.sender.fullName}</h3>
          <p className="text-xs text-[#3f4944] flex items-center justify-center gap-1 mt-0.5">
            <LocationIcon />
            {request.sender.state},{request.sender.country}
          </p>
        </div>
        {isAccepted && <span className="text-[10px] font-bold uppercase bg-[#c9eadb] text-[#005440] px-2 py-1 rounded-full">Accepted</span>}
        {isDeclined && <span className="text-[10px] font-bold uppercase bg-[#e0e3e0] text-[#6f7a74] px-2 py-1 rounded-full">Declined</span>}
      </div>

      {/* Message & Actions */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase font-bold text-[#3f4944]/60 tracking-wider">Message</span>
            <span className="text-[10px] text-[#3f4944]/40">
              {new Date(request.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
          <p className="text-[#181d1a] leading-relaxed italic text-sm">&ldquo;{request.message}&rdquo;</p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            href={`/matches/${request.matchId}`}
            className="
    flex-1 h-11
    flex items-center justify-center
    bg-transparent
    border border-[#0F6E56]
    text-[#0F6E56]
    font-bold text-sm
    rounded-lg
    hover:bg-[#f1f4f1]
    transition-all
    active:scale-[0.98]
  "
          >
            View Profile
          </Link>
          <button
            onClick={() => onAccept(request.id)}
            disabled={isActioned}
            className={`flex-1 h-11 font-bold rounded-lg text-sm transition-all active:scale-[0.98]
              ${isAccepted ? "bg-[#c9eadb] text-[#005440] cursor-default" : "bg-[#005440] text-white hover:bg-[#0f6e56] disabled:opacity-50 disabled:cursor-not-allowed"}`}
          >
            {isAccepted ? "Accepted ✓" : "Accept"}
          </button>
          <button
            onClick={() => onDecline(request.id)}
            disabled={isActioned}
            className={`flex-1 h-11 font-bold rounded-lg text-sm transition-all active:scale-[0.98]
              ${isDeclined ? "bg-[#e0e3e0] text-[#6f7a74] cursor-default" : "bg-[#ebefeb] text-[#005440] hover:bg-[#e0e3e0] disabled:opacity-50 disabled:cursor-not-allowed"}`}
          >
            {isDeclined ? "Declined" : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}
