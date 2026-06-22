"use client";

import { useState } from "react";
import Link from "next/link";
import { useTravelerProfile } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useParams } from "next/navigation";
import { useGetProfileUpcomingTrips } from "@/src/hooks/api/trip.hooks";
import { TripCardData } from "../../matches-connections/interfaces/profile-listing.interface";
import { CalendarIcon, ChatIcon, LocationIcon, MapIcon, PersonIcon } from "@/src/assets/icons";
type Tab = "about" | "trips" | "reviews";

export default function NearbyProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const params = useParams();
  const { data, isLoading } = useTravelerProfile(params.id as string);
  const user = data?.data;
  const { data: tripsData, isLoading: loading } = useGetProfileUpcomingTrips(user?.id);

  const tripPlans = tripsData?.data?.trips;
  if (isLoading || loading) {
    return (
      <main className="ml-64 min-h-screen pb-32">
        <h1>Loading...</h1>
      </main>
    );
  } else {
    return (
      <main className="ml-64 min-h-screen pb-32">
        <div className="max-w-[800px] mx-auto pt-24 px-4 sm:px-6">
          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <section className="relative mt-4">
            {/* Cover image */}
            <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-sm">
              <img src={user.coverUrl} alt="Alex Rivera's cover photo" className="w-full h-full object-cover" />
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-[#0f6e56] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-60">
                <ChatIcon />
                Message
              </button>
              {/* <button className="bg-white/90 backdrop-blur-sm text-[#0f6e56] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                    <ChatIcon />
                    Message
                  </button> */}
            </div>

            {/* Identity */}
            <div className="flex flex-col sm:flex-row items-end gap-4 px-6 -mt-12 relative z-10">
              <div className="w-32 h-32 rounded-full border-4 border-[#f7faf6] shadow-md overflow-hidden bg-white flex-shrink-0">
                <img src={user.avatarUrl} alt="Alex Rivera" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 pb-2 w-full">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-black tracking-tight text-[#181d1a] font-headline">
                    {user.fullName}, {user.age}
                  </h1>
                </div>
                <div className="flex items-center gap-4 mt-1 text-[#4d6b5f] font-medium text-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <LocationIcon /> {user.state}, {user.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon /> Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Stats ─────────────────────────────────────────────────────── */}
          {/* <section className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Trips", value: "8" },
                  { label: "Rating", value: "4.9", star: true },
                  { label: "Buddies", value: "12" },
                ].map(({ label, value, star }) => (
                  <div key={label} className="bg-[#f1f4f1] p-5 rounded-xl text-center">
                    <p className="text-[#4d6b5f] text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-2xl font-black text-[#0f6e56] flex items-center justify-center gap-1">
                      {value}
                      {star && <StarFilled />}
                    </p>
                  </div>
                ))}
              </section> */}

          {/* ── Tabs ──────────────────────────────────────────────────────── */}
          <nav className="flex gap-8 border-b border-[#bec9c3]/30 mt-8 px-2">
            {(["about", "trips", "reviews"] as Tab[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-lg font-headline capitalize transition-colors ${activeTab === tab ? "text-[#0f6e56] font-bold border-b-4 border-[#0f6e56] -mb-px" : "text-[#4d6b5f] font-semibold hover:text-[#0f6e56]"}`}>
                {tab === "trips" ? "Travel plans" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {/* ── About Tab ─────────────────────────────────────────────────── */}
          {activeTab === "about" && (
            <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left col */}
              <div className="md:col-span-2 space-y-10">
                {/* Bio */}
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
                    <span className="text-[#0f6e56]">
                      <PersonIcon />
                    </span>{" "}
                    Bio
                  </h2>
                  <p className="text-[#181d1a] leading-relaxed text-lg">{user.bio}</p>
                </div>

                {/* Active travel plans */}
                {tripPlans.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center justify-between font-headline">
                      <span className="flex items-center gap-2">
                        <span className="text-[#0f6e56]">
                          <MapIcon />
                        </span>{" "}
                        Upcoming travel plans
                      </span>
                      <Link href="#" className="text-[#0f6e56] text-sm font-bold hover:underline">
                        View all
                      </Link>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tripPlans.map((trip: TripCardData) => (
                        <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all">
                          <div className="h-32 w-full overflow-hidden">
                            <img src={trip.destination.coverUrl!} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-[#0f6e56]">{trip.name}</h3>
                            <p className="text-xs text-[#4d6b5f] mt-1">
                              {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                              })}
                              -{" "}
                              {new Date(trip.dateTo).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                            </p>
                            {/* <div className="flex mt-3 gap-1 items-center">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border border-white" />
                                <div className="w-6 h-6 rounded-full bg-slate-300 border border-white -ml-1" />
                                <span className="text-[10px] ml-1 text-[#4d6b5f] font-bold">{trip.buddies}</span>
                              </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {/* <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center justify-between font-headline">
                        <span className="flex items-center gap-2">
                          <span className="text-[#0f6e56]">
                            <ReviewsIcon />
                          </span>{" "}
                          Reviews
                        </span>
                        <Link href="#" className="text-[#0f6e56] text-sm font-bold hover:underline">
                          View all
                        </Link>
                      </h2>
                      <div className="space-y-6">
                    
                        <div className="bg-[#f1f4f1]/50 p-6 rounded-xl">
                          <div className="flex items-center gap-3 mb-3">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgadLfmZlZpWqptIWwA38huO7LmAt6X6nnrPH83HGnl0MF3eaerCyHG089Wh_RGBXg8pvfxXLn-dt3tpXr3PZTjQm-_U8hd_D2Y-z31C00tUc5mTg6A-kE-cLYDfyOMQ_QTBKYfNvZ0XKHdbkAATOQrRsNSPv_Ie9HicsFuaTf-zFJynXMcHjTMd5t21XBYufnTaLSWVK4vVewIJn6tks1PzefymXJ0n1lGDx4AHdYQK_ncx8XkfGQblN5lCSKUBYHfeJvaFafPlI" alt="Sarah L." className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <h4 className="font-bold text-sm">Sarah L.</h4>
                              <Stars count={5} sm />
                            </div>
                          </div>
                          <p className="text-sm text-[#181d1a] italic leading-relaxed">&ldquo;Alex is a fantastic travel partner! He has an incredible eye for photography and knows the best tacos in Mexico City. Very reliable and easy-going.&rdquo;</p>
                        </div>

                   
                        <div className="bg-[#f1f4f1]/50 p-6 rounded-xl">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#0f6e56] text-white flex items-center justify-center font-bold text-sm">MK</div>
                            <div>
                              <h4 className="font-bold text-sm">Mark K.</h4>
                              <Stars count={4} sm />
                            </div>
                          </div>
                          <p className="text-sm text-[#181d1a] italic leading-relaxed">&ldquo;Traveled through Japan with Alex. He&apos;s very organized with bookings but flexible enough for spontaneous adventures. 10/10 recommendation!&rdquo;</p>
                        </div>
                      </div>
                    </div> */}
              </div>

              {/* Right col */}
              <div className="space-y-10">
                {/* Travel Style */}
                <div>
                  <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Travel Style</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">{user.travelType}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Travel Personality</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">{user.travelPersonality}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((tag: string) => (
                      <span key={tag} className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((tag: string) => (
                      <span key={tag} className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Languages</h2>
                  <div className="space-y-3">
                    {user.languages.map((lang: string) => (
                      <div key={lang} className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA card */}
                {/* <div className="p-6 bg-[#0f6e56] rounded-2xl text-white">
                      <h3 className="font-bold text-lg leading-tight mb-2">Want to travel with Alex?</h3>
                      <p className="text-xs text-[#9aedcf] mb-4">You both share an interest in Street Photography and Southern Europe.</p>
                      <button onClick={() => setRequestSent(true)} disabled={requestSent} className="w-full bg-white text-[#0f6e56] font-bold py-2.5 rounded-xl text-sm shadow-sm active:scale-95 transition-transform disabled:opacity-60">
                        {requestSent ? "Request sent ✓" : "Send Invite"}
                      </button>
                    </div> */}
              </div>
            </section>
          )}

          {activeTab === "trips" && (
            <section className="mt-10">
              <p className="text-[#3f4944]">Full trip list coming soon.</p>
            </section>
          )}

          {activeTab === "reviews" && (
            <section className="mt-10">
              <p className="text-[#3f4944]">All reviews coming soon.</p>
            </section>
          )}
        </div>
      </main>
    );
  }
}
