import { useDisconnect } from "../hooks/connection.hooks";
import { Connection } from "../interfaces/profile-listing.interface";

interface ConnectionCardProps {
  connection: Connection;
  onDisconnect: (id: string) => void;
}

export default function ConnectionCard({ connection, onDisconnect }: ConnectionCardProps) {
  const disconnect = useDisconnect();
  function handleDisconnect() {
    disconnect.mutate(connection.id);
  }

  return (
    <article className="bg-white rounded-[20px] p-6 flex flex-col gap-6 ring-1 ring-[#bec9c3]/15 hover:-translate-y-0.5 transition-transform duration-200">
      {/* Top: avatar + meta + timestamp */}
      <div className="flex items-start justify-between">
        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#a0f3d4] shrink-0">
            <img src={connection.avatarUrl} alt={connection.fullName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#181d1a] font-headline">{connection.fullName}</h3>
            <div className="flex  items-center gap-1 text-[#3f4944] text-xs mt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                {connection.state}, {connection.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status message */}
      {/* <p className="text-sm text-[#3f4944] leading-relaxed">&ldquo;{connection.status}&rdquo;</p> */}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-[#bec9c3]/10">
        <div className="flex gap-3 flex-1">
          <button className="flex-1 bg-[#0f6e56] text-white font-bold py-2 px-2 rounded-xl hover:opacity-95 transition-all text-[12px] flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message
          </button>
          <button className="flex-1 border-2 border-[#005440] text-[#005440] font-bold py-2 px-2 rounded-xl hover:bg-[#f1f4f1] transition-all text-[12px]">View Profile</button>
        </div>
        <button onClick={handleDisconnect} className="ml-4 text-[#3f4944] hover:text-[#ba1a1a] py-2 px-2 rounded-lg transition-colors text-[12px] font-medium">
          Disconnect
        </button>
      </div>
    </article>
  );
}
