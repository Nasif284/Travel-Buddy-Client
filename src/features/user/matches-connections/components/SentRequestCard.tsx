import { LocationIcon } from "@/src/assets/icons";
import { SentRequest } from "../../profile/interfaces/profile.interface";
import Link from "next/link";

interface RequestCardProps {
  request: SentRequest;
  onWithdraw: (id: string) => void;
}

export default function RequestCard({ request, onWithdraw}: RequestCardProps) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm flex gap-8 transition-opacity`}>
      {/* Profile */}
      <div className="w-44 flex-shrink-0 flex flex-col items-center text-center gap-3">
        <img src={request.receiver.avatarUrl!} alt={request.receiver.fullName} className="w-20 h-20 rounded-full object-cover shadow-md" />
        <div>
          <h3 className="font-bold text-[#181d1a] font-headline text-sm">{request.receiver.fullName}</h3>
          <p className="text-xs text-[#3f4944] flex items-center justify-center gap-1 mt-0.5">
            <LocationIcon />
            {request.receiver.state},{request.receiver.country}
          </p>
        </div>
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

          <button onClick={() => onWithdraw(request.id)} className={`flex-1 h-11 font-bold rounded-lg text-sm transition-all   border border-[#c82b1a] active:scale-[0.98]  text-[#c82b1a] hover:bg-[#ffe9e9] disabled:opacity-50 disabled:cursor-not-allowed`}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
