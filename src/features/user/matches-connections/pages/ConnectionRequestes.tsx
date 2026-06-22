"use client";
import { useState } from "react";
import RequestsListing from "../components/RequestesListing";
import ConnectionsListing from "../components/ConnectionsListing";

type TabType = "Requests" | "Connections";

export default function ConnectionRequestsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Requests");
  return (
    <main className="ml-64 h-screen flex flex-col">
      <div className="mt-20 flex-1 overflow-y-auto bg-[#f1f4f1]">
        <div className="max-w-4xl mx-auto p-12">
          <div className="flex items-center justify-between mb-8">
            {/* <h2 className="text-3xl font-extrabold text-[#005440] font-headline flex items-center gap-3">
              Connections
              {requests?.length > 0 && <span className="bg-[#005440] text-white text-xs px-2.5 py-1 rounded-full">{requests.length} new</span>}
            </h2> */}

            <div className="flex gap-8 border-b border-[#bec9c3]/30">
              {(["Requests", "Connections"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-bold transition-colors
                      ${activeTab === tab ? "text-[#0F6E56] border-b-2 border-[#0F6E56]" : "text-[#181d1a] opacity-60 hover:text-[#0F6E56] hover:opacity-100"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Requests" ? (
            <RequestsListing />
          ) : (
           <ConnectionsListing/>
          )}
        </div>
      </div>
    </main>
  );
}
