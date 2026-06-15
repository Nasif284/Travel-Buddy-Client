import Link from "next/link";
import { NEARBY_TRAVELERS } from "../Data/data";
import { Icons } from "../assets";

export default function RightSidebar() {
  return (
    <aside className="h-screen w-80 fixed pt-25 right-0 top-0 bg-[#f1f4f1] flex flex-col p-8 space-y-12 z-30 overflow-y-auto">
      <section>
        <h3 className="text-[#181d1a] font-bold text-lg mb-4">Trust Score</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#181d1a]">Your Trust Score</span>
            <span className="text-[#005440] font-bold">4.8/5</span>
          </div>
          <div className="flex gap-1 mb-3">
            <Icons.StarFull />
            <Icons.StarFull />
            <Icons.StarFull />
            <Icons.StarFull />
            <Icons.StarHalf />
          </div>
          <p className="text-xs text-[#3f4944]">Based on 12 verified reviews</p>
        </div>
      </section>

      <section>
        <h3 className="text-[#181d1a] font-bold text-lg mb-4">Active Travel Plan</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <Link href="/dashboard/trips/edit" className="text-[#005440] text-xs font-bold hover:underline">
              Edit
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-[#3f4944] font-bold">Destination</span>
            <p className="font-headline font-bold text-lg text-[#005440]">Kyoto, Japan</p>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-[#3f4944] font-bold">Dates</span>
            <p className="text-sm font-medium text-[#181d1a]">Oct 12 — Oct 28, 2024</p>
          </div>
        </div>
      </section>

      <section className="flex-grow">
        <h3 className="text-[#181d1a] font-bold text-lg mb-4">Nearby Travelers</h3>
        <div className="space-y-4">
          {NEARBY_TRAVELERS.map((traveler) => (
            <button key={traveler.id} className="flex items-center gap-4 group w-full text-left">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#005440]/20 flex-shrink-0">
                <img src={traveler.avatarImage} alt={traveler.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#181d1a] group-hover:text-[#005440] transition-colors">{traveler.name}</p>
                <p className="text-xs text-[#3f4944] flex items-center gap-1">
                  <Icons.LocationIcon />
                  {traveler.distance}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
