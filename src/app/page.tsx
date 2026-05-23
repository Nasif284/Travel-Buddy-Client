import type { Metadata } from "next";
import LeftSidebar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";
import RightSidebar from "../components/RightSide";
import { NEAR_YOU, MATCHES } from "../Data/data";
import TravelerCard from "../components/TravelerCard";

export const metadata: Metadata = {
  title: "Home | Travel Buddy",
};

export default function DashboardPage() {
  return (
    <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen">
      <LeftSidebar />
      <TopBar />
      <RightSidebar />
      <main className="ml-64 mr-80 pt-24 pb-12 px-12 min-h-screen">
        <section className="mb-16">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-[#181d1a] mb-2 tracking-tight font-headline">Find who is near you</h1>
            <p className="text-[#3f4944] text-lg">Discover your perfect companion near you</p>
          </header>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {NEAR_YOU.map((traveler) => (
              <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
          </div>
        </section>
        <section>
          <header className="mb-10">
            <h1 className="text-4xl font-black text-[#181d1a] mb-2 tracking-tight font-headline">Find your match</h1>
            <p className="text-[#3f4944] text-lg">Discover your perfect match for your trip</p>
          </header>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {MATCHES.map((traveler) => (
              <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
