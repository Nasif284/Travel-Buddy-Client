"use client"
import { TripStatus } from '../interfaces/interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetUserPastTrips, useGetUserUpcomingTrips } from '../hooks/trip.hooks';
const TABS: { key: TripStatus; label: string }[] = [
  { key: "active", label: "Active Plans" },
  { key: "past", label: "Past" },
];
const PlansTabs = () => {
    const pathName = usePathname();
    const activeTab = pathName.split("/")[3]

    const {data:pastTrips} = useGetUserPastTrips()
    const {data:activeTrips} = useGetUserUpcomingTrips()
    const counts = {
      active: activeTrips?.data?.trips?.length,
      past: pastTrips?.data?.trips?.length,
    };
  return (
    <div className="flex gap-8 border-b border-[#bec9c3]/10">
      {TABS.map((tab) => (
        <Link href={`/trips/plans/${tab.key}`} key={tab.key} className={`pb-2    border-b-2 font-medium transition-all ${activeTab === tab.key ? "border-[#005440] text-[#005440] font-bold" : "border-transparent text-[#3f4944] hover:text-[#181d1a]"}`}>
          {tab.label} ({counts[tab.key]}) 
        </Link>
      ))}
    </div>
  );
}

export default PlansTabs