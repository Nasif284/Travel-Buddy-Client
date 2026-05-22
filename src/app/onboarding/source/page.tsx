"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const options: Option[] = [
  {
    id: "friends",
    label: "Friends or Family",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Social Media",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search Engine",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    id: "blog",
    label: "Travel Blog or Article",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    id: "appstore",
    label: "App Store",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z" />
      </svg>
    ),
  },
  {
    id: "other",
    label: "Other",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
];

export default function ReferralSource() {
  const [selected, setSelected] = useState<string | null>("friends");
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    // TODO: save referral source and navigate to next onboarding step
    console.log("Referral source:", selected);
    router.push("/onboarding/next"); // update to your next route
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ backgroundColor: "#F5F5F3" }}>
      {/* Main Card */}
      <main className="w-full max-w-[600px] bg-white rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-sm z-10">
        {/* Branding */}
        <div className="mb-8 flex flex-col items-center w-full">
          <div className="mb-6">
            <span className="font-headline text-xl font-black text-[#005440] tracking-tight">Travel Buddy</span>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 bg-[#c9eadb] rounded-full flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-[#0f6e56] fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.66 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#181d1a] mb-2 text-center tracking-tight font-headline">How did you hear about us?</h1>
          <p className="text-[#3f4944] text-base text-center max-w-md">This helps us understand where our community is growing.</p>
        </div>

        {/* Options Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button key={opt.id} onClick={() => setSelected(opt.id)} className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all active:scale-[0.98] ${isSelected ? "bg-white ring-2 ring-[#005440]" : "bg-[#e0e3e0] hover:bg-[#f1f4f1]"}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${isSelected ? "bg-[#0f6e56] text-white" : "bg-[#e5e9e5] text-[#3f4944]"}`}>{opt.icon}</div>
                <span className={`text-sm font-semibold ${isSelected ? "text-[#005440]" : "text-[#181d1a] font-medium"}`}>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button onClick={handleContinue} disabled={!selected} className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Continue
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </main>

      {/* Decorative background images */}
      <div className="fixed top-0 right-0 p-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="relative w-64 h-64 overflow-hidden rounded-2xl rotate-3 shadow-xl">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoOQtb9fjvKax3zhQ6qPi2ZRsI8fLcvLhLgymVlM75EY7uBC3JVmtm1gw39JapTDZA0qApIo6M5cfXxWwbMWBCtKTeTuuPIhhewAqyIjfPGqDEIvNESFBJYct6-jOwK4psfju86egssUcCV8KoICzBqDZfbE5itSH2GIOYo6jJ6IA2aFZZswbPlDTMdEmQ5GXQWMHMCZgYINDqxxYhdqQNz9FJoue_i_0S5_w7E1E5FffcCDGILWqLpGOCJUd0UNT7xJD3WMamMfY" alt="" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="relative w-72 h-48 overflow-hidden rounded-2xl -rotate-6 shadow-xl">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB050z8TQ2sr5HmpW9coaUcAjOuUsymIuiBqwgB9s0udSpk8lGfKvFFwhD1v01A9SewT7k86XHmzYKiw-TY9Y4Usg_rpPvsb2GAmfwn4sWmZBp5VxvOC1DDP2ajz4QmUF_NUjk5a6yyOX5hoXW0mc_h7egq7a_G4oy6N_Zs_nPJqAScaYPG0O9BJRxUdM6aNnjbovkCfqZ6k9dKhDVNGOdmRgxCqk4CkXXgduLeLPo7cE5se49s0BK4qTbSPUrkVkSQ0m0JKX0YbWE" alt="" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
    </div>
  );
}
