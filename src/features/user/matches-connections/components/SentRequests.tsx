import { SentRequest } from "../../profile/interfaces/profile.interface";
import { useGetSentRequests, useWithdrawRequest } from "../hooks/connection.hooks";
import SentRequestCard from "./SentRequestCard";

const SentRequestsListing = () => {
  const { data, isLoading } = useGetSentRequests();
  const requests = data?.data?.requests ?? [];
  const withdraw = useWithdrawRequest();

  function handleWithdraw(id: string) {
    withdraw.mutate(id);
  }
  if (isLoading) {
    return (
      <main className="ml-64 min-h-screen pb-32">
        <h1>Loading...</h1>
      </main>
    );
  }
  if (requests.length > 0) {
    return (
      <div className="flex flex-col gap-6">
        {requests.map((req:SentRequest) => (
          <SentRequestCard onWithdraw={handleWithdraw} request={req} key={req.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-[#3f4944] font-medium mb-2">No sent requests yet.</p>
        <p className="text-[#6f7a74] text-sm">Requests you send will appear here.</p>
      </div>
    );
  }
};

export default SentRequestsListing;
