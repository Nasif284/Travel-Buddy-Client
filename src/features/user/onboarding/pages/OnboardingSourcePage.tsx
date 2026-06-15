"use client";

import { useState } from "react";
import SourceOptions from "../components/SourceOptions";
import { useSetSource } from "../hooks/onboarding.hooks";

export default function ReferralSourcePage() {
  const [selected, setSelected] = useState<string>("friends");
  const setSource = useSetSource()
  const handleContinue = () => {
    if (!selected) return;
    console.log("Referral source:", selected);
    setSource.mutate({source:selected})
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ backgroundColor: "#F5F5F3" }}>
      <main className="w-full max-w-[600px] bg-white rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-sm z-10">
        <div className="mb-8 flex flex-col items-center w-full">
          <div className="mb-6">
            <span className="font-headline text-xl font-black text-[#005440] tracking-tight">Travel Buddy</span>
          </div>

          <div className="w-14 h-14 bg-[#c9eadb] rounded-full flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-[#0f6e56] fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.66 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#181d1a] mb-2 text-center tracking-tight font-headline">How did you hear about us?</h1>
          <p className="text-[#3f4944] text-base text-center max-w-md">This helps us understand where our community is growing.</p>
        </div>

        <SourceOptions onSelect={(label:string) => setSelected(label)} selected={selected} />

        <button onClick={handleContinue} disabled={!selected} className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Continue
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </main>

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
