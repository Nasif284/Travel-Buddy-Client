"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Step = { label: string; level:number, path:string };
const STEPS: Step[] = [
  { label: "Account", level: 1, path:"account" },
  { label: "Profile", level: 2, path:"profile" },
  { label: "Travel Style", level: 3, path:"travel-style" },
  { label: "Travel Plan", level: 4, path:"travel-plan" },
];

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const path:string = usePathname().split("/")[2]
  const activeStep:Step|undefined = STEPS.find((e) => e.path == path)
  const activeLevel: number | undefined = activeStep?.level

  return (
    <div className="bg-[#f7faf6] font-body text-[#181d1a] min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 bg-[#f1f4f1]/90 backdrop-blur-md border-b border-[#bec9c3]/10">
        <div className="text-xl font-black text-[#0F6E56] tracking-tight font-headline">Travel Buddy</div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Help" className="p-2 hover:bg-zinc-100 transition-colors rounded-full text-zinc-500">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
          </button>
          <Link href="/onboarding" aria-label="Close" className="p-2 hover:bg-zinc-100 transition-colors rounded-full text-zinc-500">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <nav className="w-full flex justify-center py-6 px-4 bg-[#f1f4f1] sticky top-[68px] z-40 border-b border-[#bec9c3]/10">
        <div className="max-w-2xl w-full flex items-center justify-between gap-2">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${activeLevel && step.level < activeLevel ? "bg-[#0f6e56] text-white" : activeLevel && step.level == activeLevel ? "bg-[#0f6e56] text-white" : "bg-[#e0e3e0] text-[#3f4944] opacity-50"}`}>
                {activeLevel && step.level < activeLevel ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm font-bold hidden md:block font-headline ${activeLevel && step.level > activeLevel ? "text-[#3f4944] opacity-50" : "text-[#0f6e56]"}`}>{step.label}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-[2px] ml-2 ${activeLevel && step.level < activeLevel ? "bg-[#0f6e56] opacity-20" : "bg-[#bec9c3] opacity-30"}`} />}
            </div>
          ))}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout