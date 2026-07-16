"use client";

import CreateGroupCard from "../components/CreateGroupCard";
import TripGroupCard from "../components/TripGroupCard";
import { GroupData} from "../interfaces/interface";
import CreateGroupButton from "../components/CreateGroupButton";
import { useGetActiveGroups } from "../hooks/trip.hooks";

export default function TripGroups() {
  const {data,isLoading} = useGetActiveGroups()
  const groups = data?.data?.groups || []
  function handleNewTrip() {
    console.log("New trip clicked");
  }
  if (isLoading) {
  return (
    <main className="ml-64 mt-20 min-h-screen pb-32">
      <h1>Loading...</h1>
    </main>
  );
}
  return (
    <main className="ml-64 mt-20 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-[#181d1a] tracking-tight mb-2 font-headline">Your Group Trips</h2>
            <p className="text-[#3f4944] text-lg font-medium opacity-80">Manage your active travel squads and upcoming adventures.</p>
          </div>
          <CreateGroupButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group:GroupData) => (
            <TripGroupCard key={group.id} group={group} />
          ))}
          <CreateGroupCard onClick={handleNewTrip} />
        </div>
      </div>
    </main>
  );
}
