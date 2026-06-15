"use client"
import React from 'react'
import TravelerCard from './TravelerCard';
import { useGetUsersForCards } from '../hooks/api/users.hooks';
import { UserWithDetails } from '../Interfaces/users.interface';

const MatchSuggestions = () => {
  const { data, isLoading } = useGetUsersForCards({ page: 1, limit: 15 });
  if (isLoading) {
    return <h1>Loading</h1>
  } else {
     return (
       <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
         {data?.data?.users.map((traveler:UserWithDetails) => (
           <TravelerCard key={traveler.id} traveler={traveler} isNearBy={false} />
         ))}
       </div>
     );
  }
}

export default MatchSuggestions