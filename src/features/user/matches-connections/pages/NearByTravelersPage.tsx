"use client";

import { useState } from "react";
import TravelerCard from "@/src/features/user/matches-connections/components/TravelerCard";
import { useGetNearbyUsers } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { Pagination } from "@/src/components/Pagination";
import { UserWithDetails } from "@/src/Interfaces/users.interface";

const LIMIT = 16;

export default function NearbyTravelersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetNearbyUsers({
    page,
    limit: LIMIT,
  });
  if (!isLoading) {
    console.log(data);
  }
  if (isLoading) {
    return  <div className="ml-64 px-16 pt-24 pb-8 mt space-y-10"><div>Loading...</div></div> 
  }

  const users = data?.data?.users ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const currentPage = data?.data?.page ?? 1;

  return (
    <div className="ml-64 px-16 pt-24 pb-8 mt space-y-10">
      <div>
        <h1 className="text-4xl font-black">Travelers Around You</h1>
        <p className="text-[#3f4944] mt-2">Discover travelers currently near your location</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {users.map((traveler: UserWithDetails) => (
          <TravelerCard key={traveler.id} traveler={traveler} isNearBy />
        ))}
      </div>

      <Pagination onPageChange={setPage} page={currentPage} totalPages={totalPages} />
    </div>
  );
}
