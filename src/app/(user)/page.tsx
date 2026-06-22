import type { Metadata } from "next";
import LeftSidebar from "../../components/LeftSideBar";
import TopBar from "../../components/TopBar";
import RightSidebar from "../../components/RightSide";
import NearbyTravelers from "../../features/user/matches-connections/components/NearbyTravelers";
import MatchSuggestions from "../../features/user/matches-connections/components/MatchSuggestions";

export const metadata: Metadata = {
  title: "Home | Travel Buddy",
};

export default function DashboardPage() {
  return (
    <>
      <RightSidebar />
      <main className="ml-64 mr-80 pt-24 pb-12 px-12 min-h-screen">
        <section className="mb-16">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-[#181d1a] mb-2 tracking-tight font-headline">Find who is traveling near you</h1>
            <p className="text-[#3f4944] text-lg">Discover your perfect travel companion near you</p>
          </header>
          <NearbyTravelers />
        </section>
        <section>
          <header className="mb-10">
            <h1 className="text-4xl font-black text-[#181d1a] mb-2 tracking-tight font-headline">Find your match</h1>
            <p className="text-[#3f4944] text-lg">Discover your perfect match for your trip</p>
          </header>
          <MatchSuggestions />
        </section>
      </main>
    </>
  );
}
