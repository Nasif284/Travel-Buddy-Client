"use client";

import { useEffect, useState } from "react";
import { useEditTravelStyle, useSetTravelStyle } from "../hooks/onboarding.hooks";
import { useAuthMe } from "../../auth/hooks/auth.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import { useGetMe } from "../../matches-connections/hooks/users.hooks";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";

type TravelStyle = "Budget" | "Backpacker" | "Luxury";
type Interest = "Beach" | "Mountains" | "Party" | "Culture" | "Foodie" | "Hiking";
type Personality = "Introvert" | "Ambivert" | "Extrovert";
type MatchPref = "Men" | "Women" | "Everyone";

export default function TravelStylePage() {
  const { onboarding } = useAuthStore((state) => state);
  const enabled = onboarding.step > 3;
  const { data, isLoading } = useGetMe(enabled);
  const me = data?.data;
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Backpacker");
  const [interests, setInterests] = useState<Set<Interest>>(new Set(["Mountains", "Culture"]));
  const [personality, setPersonality] = useState<Personality>("Extrovert");
  const [matchPref, setMatchPref] = useState<MatchPref>("Everyone");

  const setStyle = useSetTravelStyle();
  const editStyle = useEditTravelStyle();
  const allTravelStyles: TravelStyle[] = ["Budget", "Backpacker", "Luxury"];
  const allInterests: Interest[] = ["Beach", "Mountains", "Party", "Culture", "Foodie", "Hiking"];
  const allPersonalities: Personality[] = ["Introvert", "Ambivert", "Extrovert"];
  const allMatchPrefs: MatchPref[] = ["Men", "Women", "Everyone"];

  function toggleInterest(item: Interest) {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }
  useEffect(() => {
    if (!me) return;
    console.log(me);
    setTravelStyle(capitalizeFirstLetter(me.travelType) as TravelStyle);
    setInterests(new Set(me.interests.map((i) => capitalizeFirstLetter(i)) as Interest[]));
    setPersonality(capitalizeFirstLetter(me.travelPersonality) as Personality);
    setMatchPref(capitalizeFirstLetter(me.matchWith) as MatchPref);
  }, [me]);
  function handleContinue() {
    const data = { travelType: travelStyle.toLowerCase(), interests: [...interests], travelPersonality: personality.toLowerCase(), matchWith: matchPref.toLowerCase() };
    if (me.onboardingCompleted) {
      editStyle.mutate(data);
    } else {
      setStyle.mutate(data);
    }
    // router.push("/onboarding/travel-plan");
  }

  const activePill = "bg-[#c9eadb] text-[#4d6b5f] border-[#c9eadb]";
  const inactivePill = "border-[#bec9c3] text-[#3f4944] hover:border-[#0f6e56] hover:text-[#0f6e56]";
  if (isLoading) {
    return (
      <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
        <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
          <h2>Loading...</h2>
        </div>

        <div className="mt-12 mb-8 text-center">
          <p className="text-[#3f4944] font-bold text-sm tracking-widest uppercase">Step 3 of 4</p>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight mb-3">Define your travel style</h1>
          <p className="text-[#3f4944] leading-relaxed">Help us match you with the right companions and trips.</p>
        </div>

        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">How do you prefer to travel?</legend>
            <div className="flex flex-wrap gap-3">
              {allTravelStyles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTravelStyle(s)}
                  className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-colors
                      ${travelStyle === s ? activePill : inactivePill}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 2 · Interests */}
          <fieldset className="space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">What are you interested in?</legend>
            <div className="flex flex-wrap gap-2">
              {allInterests.map((item) => {
                const selected = interests.has(item);
                return (
                  <button
                    onClick={() => toggleInterest(item)}
                    key={item}
                    type="button"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors
                        ${selected ? "bg-[#0f6e56] text-white" : "bg-[#e0e3e0] text-[#181d1a] hover:bg-[#c9eadb]"}`}
                  >
                    {item}
                    {selected && (
                      <span>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3 · Personality */}
          <fieldset className="space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">Travel personality</legend>
            <div className="flex p-1.5 bg-[#e0e3e0] rounded-xl w-full">
              {allPersonalities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersonality(p)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all
                      ${personality === p ? "bg-white text-[#0F6E56] shadow-sm" : "text-[#3f4944] hover:text-[#181d1a]"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 4 · Match Preferences */}
          <fieldset className="space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">Who would you like to match with?</legend>
            <div className="flex flex-wrap gap-3">
              {allMatchPrefs.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMatchPref(m)}
                  className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-colors
                      ${matchPref === m ? activePill : inactivePill}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-[#bec9c3]/10">
            <Link
              href="/onboarding/profile"
              className="
      inline-flex items-center justify-center gap-2
      text-[#3f4944]
      font-semibold
      hover:text-[#0f6e56]
      transition-all
      active:scale-95
    "
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </Link>

            <button
              type="button"
              onClick={handleContinue}
              disabled={setStyle.isPending}
              className={`
      inline-flex items-center justify-center gap-2
      w-[160px] h-12
      rounded-xl
      font-semibold
      text-white
      shadow-md
      transition-all
      active:scale-95
      ${setStyle.isPending ? "bg-[#addbd0] cursor-not-allowed" : "bg-[#0f6e56] hover:bg-[#005440]"}
    `}
            >
              {setStyle.isPending ? (
                "Submitting..."
              ) : (
                <>
                  Continue
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8 text-center">
        <p className="text-[#3f4944] font-bold text-sm tracking-widest uppercase">Step 3 of 4</p>
      </div>
    </main>
  );
}
