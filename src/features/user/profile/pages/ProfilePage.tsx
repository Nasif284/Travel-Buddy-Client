"use client";

import { useState } from "react";
import Link from "next/link";
import { useTravelerProfile } from "@/src/hooks/api/users.hooks";
import { useParams } from "next/navigation";
import { BuddyRequestModal } from "../components/BuddyRequestModal";

const LocationIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);
const SparkleIcon = () => (
  <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const PersonAddIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8H4v2H2v2h2v2h2v-2h2v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const ChatIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);
const PersonIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const MapIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </svg>
);
const ReviewsIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
const StarFilled = ({ sm = false }) => (
  <svg className={`fill-current text-[#0f6e56] ${sm ? "w-3 h-3" : "w-5 h-5"}`} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const StarOutline = ({ sm = false }) => (
  <svg className={`fill-current text-[#bec9c3] ${sm ? "w-3 h-3" : "w-5 h-5"}`} viewBox="0 0 24 24">
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
  </svg>
);

function Stars({ count, max = 5, sm = false }: { count: number; max?: number; sm?: boolean }) {
  return <div className="flex gap-0.5">{Array.from({ length: max }, (_, i) => (i < count ? <StarFilled key={i} sm={sm} /> : <StarOutline key={i} sm={sm} />))}</div>;
}

type Tab = "about" | "trips" | "reviews";

export default function TravelerProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [requestSent, setRequestSent] = useState(false);
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const params = useParams();
  const { data, isLoading } = useTravelerProfile(params.id as string);
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <main className="ml-64 min-h-screen pb-32">
          <div className="max-w-[800px] mx-auto pt-24 px-4 sm:px-6">
            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="relative mt-4">
              {/* Cover image */}
              <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-sm">
                <img src={data.data.coverUrl} alt="Alex Rivera's cover photo" className="w-full h-full object-cover" />
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => setShowBuddyRequestModal(true)} disabled={requestSent} className="bg-[#0f6e56] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-60">
                  <PersonAddIcon />
                  {requestSent ? "Request sent" : "Send buddy request"}
                </button>
                {/* <button className="bg-white/90 backdrop-blur-sm text-[#0f6e56] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                    <ChatIcon />
                    Message
                  </button> */}
              </div>

              {/* Identity */}
              <div className="flex flex-col sm:flex-row items-end gap-4 px-6 -mt-12 relative z-10">
                <div className="w-32 h-32 rounded-full border-4 border-[#f7faf6] shadow-md overflow-hidden bg-white flex-shrink-0">
                  <img src={data.data.avatarUrl} alt="Alex Rivera" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-2 w-full">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-black tracking-tight text-[#181d1a] font-headline">
                      {data.data.fullName}, {data.data.age}
                    </h1>
                    <span className="bg-[#c9eadb] text-[#4d6b5f] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <SparkleIcon /> 92% match
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[#4d6b5f] font-medium text-sm flex-wrap">
                    <span className="flex items-center gap-1">
                      <LocationIcon /> {data.data.state}, {data.data.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon /> Member since{" "}
                      {new Date(data.data.createdAt).toLocaleDateString("en-US", {
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
                    <p className="text-[#181d1a] leading-relaxed text-lg">{data.data.bio}</p>
                  </div>

                  {/* Active travel plans */}
                  {/* <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center justify-between font-headline">
                        <span className="flex items-center gap-2">
                          <span className="text-[#0f6e56]">
                            <MapIcon />
                          </span>{" "}
                          Active travel plans
                        </span>
                        <Link href="#" className="text-[#0f6e56] text-sm font-bold hover:underline">
                          View all
                        </Link>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Northern India Expedition",
                            dates: "Oct 12 - Oct 28, 2024",
                            buddies: "+2 buddies",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6lRSqLD5n8bfQEv7kqdsWwCZDxZUcO1NQulrrd7Tt9N6PQc1WGFUM2M6x93LZ7o9rYlk_idwYOyVkHFCEF-AEFPGFf_0JYJkBR65VmYRdohxWAhlWp1GDGzNyq3wPYPr_Vs7YbGQ6qbuLQXSaez0cYDyA2ZQLiiDXeu3FGtCVVPeHp7NXC9qtGLXoeQXRLzdaK-_5leEo3Sj_gJCC4c4DsKs3ixCKyQHvZLCQX-VmgX93zbbSB15is0hzIvK3aQAt1bce8oWT8Q8",
                            alt: "India trip",
                          },
                          {
                            title: "Parisian Weekend",
                            dates: "Dec 05 - Dec 08, 2024",
                            buddies: "1 buddy joined",
                            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXVFPiPSeJwq-xWoHANcG8ms0mr0whVQd5KVjCDODi76FNHT2GB4X9xIB2G1iZpkygr_CJWYI4xvcMQz1GsOfCy24SMhZbjkp3T451hgrzL924L711te51RCIM-xWTCuNJmNx8wrgLhFYaNCzhzSCXkOfJMUYRsCbvBEuC3H5hda9jgF8dFrj1PIqGY-nCjAOQGT2oYPqwCssBrsaLHcOwDTeq-EZ5b8V93ZA0OyqRBOz5FvtcJBTCOyNdNxFl84gM5YUDEzcSB_Q",
                            alt: "Paris trip",
                          },
                        ].map((trip) => (
                          <div key={trip.title} className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all">
                            <div className="h-32 w-full overflow-hidden">
                              <img src={trip.img} alt={trip.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-[#0f6e56]">{trip.title}</h3>
                              <p className="text-xs text-[#4d6b5f] mt-1">{trip.dates}</p>
                              <div className="flex mt-3 gap-1 items-center">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border border-white" />
                                <div className="w-6 h-6 rounded-full bg-slate-300 border border-white -ml-1" />
                                <span className="text-[10px] ml-1 text-[#4d6b5f] font-bold">{trip.buddies}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div> */}

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
                      <span className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">{data.data.travelType}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Travel Personality</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">{data.data.travelPersonality}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.data.skills.map((tag:string) => (
                        <span key={tag} className="bg-[#c9eadb] text-[#0f6e56] text-xs font-bold px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter text-[#4d6b5f]">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.data.interests.map((tag:string) => (
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
                      {data.data.languages.map((lang:string) => (
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

            {/* ── Travel Plans Tab ──────────────────────────────────────────── */}
            {activeTab === "trips" && (
              <section className="mt-10">
                <p className="text-[#3f4944]">Full trip list coming soon.</p>
              </section>
            )}

            {/* ── Reviews Tab ───────────────────────────────────────────────── */}
            {activeTab === "reviews" && (
              <section className="mt-10">
                <p className="text-[#3f4944]">All reviews coming soon.</p>
              </section>
            )}
          </div>
        </main>

        {/* ── Sticky footer CTA ─────────────────────────────────────────────── */}
        {!bannerDismissed && !requestSent && (
          <div className="fixed bottom-6 left-220 -translate-x-1/2 w-[calc(100%-48px-256px)] max-w-[750px] bg-[#0f6e56] rounded-2xl p-4 shadow-2xl flex items-center justify-between z-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden hidden sm:block flex-shrink-0">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdJqcvbhj1vtqM6S92lAi2EqV48QSEefe6af5J5Hwf1jzO7_rjfHHglThGRNUUlubla6e3hP6PHHBMD5kTBSaKNzd69KYa5UsR44uJTDsQWX15Vel71xrTEs5sLBZFSFj-GYN3kk_jxQ2VNGaB2m6UXo4FP-hW9StA8IfsyMtK24X6le5wJlfyLg65CCh4_ZyVYFJyFbH1vOhB1cVBP2mLv062DZ2o2uPdVlyUtEzoxiaeSIB-gPinydZDcTxw6IsnQ5qFFBSkWkc" alt="Alex Rivera" className="w-full h-full object-cover" />
              </div>
              <div className="text-white">
                <p className="font-bold text-sm leading-tight">Send buddy request to Alex</p>
                <p className="text-xs text-[#9aedcf]">He usually responds within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowBuddyRequestModal(true)} className="bg-white text-[#0f6e56] px-6 py-2 rounded-xl font-black text-sm active:scale-95 transition-all">
                Send Request
              </button>
              <button onClick={() => setBannerDismissed(true)} aria-label="Dismiss" className="p-2 text-[#9aedcf] hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
        <BuddyRequestModal
          isOpen={showBuddyRequestModal}
          onClose={() => setShowBuddyRequestModal(false)}
          user={{
            name: data.data.fullName,
            avatarUrl: data.data.avatarUrl,
          }}
          onSend={(message:string) => {
            console.log(message);

            // sendBuddyRequest.mutate({
            //   receiverId: data.data.id,
            //   message,
            // });

            setRequestSent(true);
          }}
        />
      </>
    );
  }
}
