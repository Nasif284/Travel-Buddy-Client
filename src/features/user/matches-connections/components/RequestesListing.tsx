import { useState } from "react";
import IncomingRequestsListing from "./IncomingRequests";
import SentRequestsListing from "./SentRequests";


export default function BuddyRequestsPage() {
  const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");
  const requests = []
  const pendingCount = 2

  return (
    // This component renders inside the dashboard layout (ml-64 mt-20 already handled by layout)
    <div className="min-h-screen bg-[#f1f4f1] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-[#005440] font-headline flex items-center gap-3">
            Buddy requests
            {pendingCount > 0 && <span className="bg-[#005440] text-white text-xs px-2.5 py-1 rounded-full font-semibold">{pendingCount} new</span>}
          </h2>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-[#bec9c3]/30">
            <button onClick={() => setActiveTab("incoming")} className={`pb-2 text-sm font-medium transition-colors ${activeTab === "incoming" ? "text-[#0F6E56] font-bold border-b-2 border-[#0F6E56]" : "text-[#3f4944] hover:text-[#0F6E56]"}`}>
              Incoming
            </button>
            <button onClick={() => setActiveTab("sent")} className={`pb-2 text-sm font-medium transition-colors ${activeTab === "sent" ? "text-[#0F6E56] font-bold border-b-2 border-[#0F6E56]" : "text-[#3f4944] hover:text-[#0F6E56]"}`}>
              Sent
            </button>
          </div>
        </div>

        {/* Request cards */}
        {activeTab === "incoming" ? (
          <IncomingRequestsListing />
        ) :<SentRequestsListing/>}
      </div>
    </div>
  );
}