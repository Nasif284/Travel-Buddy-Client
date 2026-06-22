import React from "react";
import RequestCard from "../../profile/components/RequestCard";
import { ConnectionRequest } from "../../profile/interfaces/profile.interface";
import { useAcceptRequest, useGetIncomingRequests, useRejectRequest } from "../hooks/connection.hooks";

const RequestsListing = () => {
  const { data, isLoading } = useGetIncomingRequests();
  const requests = data?.data?.requests ?? []
  const accept = useAcceptRequest();
  const decline = useRejectRequest();
  function handleAccept(id: string) {
    accept.mutate(id);
  }

  function handleDecline(id: string) {
    decline.mutate(id);
  }
  if (isLoading) {
    return (
      <main className="ml-64 min-h-screen pb-32">
        <h1>Loading...</h1>
      </main>
    );
  }
  if (requests?.length > 0) {
    return (
      <div className="flex flex-col gap-6">
        {requests.map((request: ConnectionRequest) => (
          <RequestCard key={request.id} request={request} onAccept={handleAccept} onDecline={handleDecline} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#3f4944]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 opacity-30">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
        <p className="font-headline font-bold text-lg opacity-40">No connection requests</p>
        <p className="text-sm opacity-30 mt-1">Your incoming buddy requests will appear here.</p>
      </div>
    );
  }
};

export default RequestsListing;
