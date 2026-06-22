import ConnectionCard from "./ConnectionsCard";
import AddBuddyCard from "./AddBuddyCard";
import { useGetConnections } from "../hooks/connection.hooks";
import { Connection } from "../interfaces/profile-listing.interface";

export default function ConnectionsListing() {
    const { data, isLoading } = useGetConnections();
  
  const connections = data?.data?.connections ?? [];
  function handleDisconnect(id: string) {}
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (connections?.length > 0) {
    return (
      <div className="flex-1 p-10">
        <section className="mb-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-bold text-[#181d1a] tracking-tight font-headline">My Connections</h2>
              <p className="text-base text-[#3f4944] mt-2 max-w-xl leading-relaxed">Reconnect with fellow travelers you&apos;ve met along the way. Your trusted network for the next adventure.</p>
            </div>
            {/* <button className="flex items-center gap-1.5 bg-[#e5e9e5] text-[#005440] font-bold py-2 px-5 rounded-xl text-sm hover:bg-[#e0e3e0] transition-colors">
              Recent First
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button> */}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {connections.map((connection:Connection) => (
            <ConnectionCard key={connection.id} connection={connection} onDisconnect={handleDisconnect} />
          ))}
          <AddBuddyCard />
        </section>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#3f4944]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 opacity-30">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
        <p className="font-headline font-bold text-lg opacity-40">No connections yet</p>
        <p className="text-sm opacity-30 mt-1">Your connections will be listed here.</p>
      </div>
    );
  }
}
