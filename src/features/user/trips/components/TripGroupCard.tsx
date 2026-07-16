import { CalendarIcon } from "@/src/assets/icons";
import { GroupData, TripGroup } from "../interfaces/interface";
import AvatarStack from "./AvatarStack";
import Link from "next/link";
const Icons = {
  location: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};
export default function TripGroupCard({ group }: { group: GroupData }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_16px_32px_-12px_rgba(24,29,26,0.06)] group hover:-translate-y-1 transition-transform duration-300">
      {/* Cover image */}
      <div className="relative h-32 overflow-hidden">
        <img src={group.coverUrl!} alt={group.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#005440]">{trip.status}</div> */}
      </div>

      {/* Body */}
      <div className="py-3 px-3 flex flex-col flex-1 gap-2">
        <h3 className="text-xl font-bold text-[#181d1a]  font-headline">{group.name}</h3>
        <p className="text-[13px] text-[#3f4944] flex items-center gap-1 ">
          {Icons.location}
          {group.destination}
        </p>
        <p className="text-[12px] text-[#3f4944] mb-3 flex items-center gap-2">
          <CalendarIcon />
          {new Date(group.dateFrom).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          })}{" "}
          -{" "}
          {new Date(group.dateTo).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mt-auto border-t border-[#bec9c3]/10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#3f4944] uppercase tracking-tight">{group.members.length} Members</span>
            <AvatarStack members={group.members} />
          </div>
          <Link href={`/trips/groups/${group.id}/overview`}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-colors
              ${true ? "bg-[#0f6e56] text-white hover:bg-[#005440]" : "bg-[#c9eadb] text-[#005440] hover:bg-[#e5e9e5]"}`}
          >
            View Group
          </Link>
        </div>
      </div>
    </div>
  );
}
