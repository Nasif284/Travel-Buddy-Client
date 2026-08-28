"use client";
import { useGetActiveTrip } from "../features/user/matches-connections/hooks/matches.hooks";
import LoadingSpinner from "./Loading";
import InstallPWA from "./InstallPWA";

export default function RightSidebar() {
  const { data: activeTrip, isLoading: loading } = useGetActiveTrip();
  if (loading) {
    return (
      <aside className="h-screen w-80 fixed pt-25 right-0 top-0 bg-[#f1f4f1] flex flex-col p-8 space-y-12 z-30 overflow-y-auto">
        <LoadingSpinner />
      </aside>
    );
  }
  const trip = activeTrip?.data
  return (
    <aside className="h-screen w-80 fixed pt-25 right-0 top-0 bg-[#f1f4f1] flex flex-col p-8 space-y-12 z-30 overflow-y-auto">
      {/* <section>
        <h3 className="text-[#181d1a] font-bold text-lg mb-4">Trust Score</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#181d1a]">Your Trust Score</span>
            <span className="text-[#005440] font-bold">4.8/5</span>
          </div>
          <div className="flex gap-1 mb-3">
            <StarFull />
            <StarFull />
            <StarFull />
            <StarFull />
            <StarHalf />
          </div>
          <p className="text-xs text-[#3f4944]">Based on 12 verified reviews</p>
        </div>
      </section> */}
      {trip?.name && (
        <section>
          <h3 className="text-[#181d1a] font-bold text-lg mb-4">Active Travel Plan</h3>
          <div className="bg-white p-6 rounded-xl shadow-sm relative overflow-hidden">
            {/* <div className="absolute top-0 right-0 p-3">
            <Link href="/dashboard/trips/edit" className="text-[#005440] text-xs font-bold hover:underline">
              Edit
            </Link>
          </div> */}
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#3f4944] font-bold">Trip Title</span>
              <p className="font-headline font-bold text-lg text-[#005440]">{trip.name}</p>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#3f4944] font-bold">Dates</span>
              <p className="text-sm font-medium text-[#181d1a]">
                {" "}
                {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                -{" "}
                {new Date(trip.dateTo).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </p>
            </div>
          </div>
          <InstallPWA />
        </section>
      )}
    </aside>
  );
}
