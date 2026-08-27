"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
      <path d="M4 4v5h5" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
      <path d="M20 20v-5h-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.3 3.6 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Application Error]", error);
  }, [error]);

    return (
      <main className="flex flex-grow items-center justify-center h-[100vh] w px-6">
        <div className="w-full max-w-xl text-center">
          {/* Error illustration */}
          <div className="relative mx-auto mb-12 flex h-64 w-64 items-center justify-center rounded-full bg-[#f1f4f1] md:h-80 md:w-80">
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-[#0f6e56]/20" />

            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#ffdad6] text-[#ba1a1a] shadow-lg">
              <AlertIcon />
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-[#bec9c3]/15 bg-white/70 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#ba1a1a]" />

              <span className="text-xs font-bold uppercase tracking-wider text-[#93000a]">Connection Error</span>
            </div>
          </div>

          {/* Text */}
          <div className="mx-auto max-w-lg">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ba1a1a]">Something went wrong</p>

            <h1 className="font-['Manrope'] text-4xl font-extrabold leading-tight tracking-tight text-[#005440] md:text-4xl">Our journey hit a bump.</h1>

            <p className="mt-4 font-['Inter'] text-sm leading-relaxed text-[#3f4944]">Something went wrong while loading this page. You can try again, or head back home and continue exploring.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6e56] px-8 font-bold text-white shadow-lg shadow-[#0f6e56]/20 transition hover:bg-[#005440] active:scale-95"
            >
              <RefreshIcon />
              Try again
            </button>

            <Link href="/" className="flex h-12 items-center justify-center gap-2 rounded-xl px-8 font-semibold text-[#005440] transition hover:bg-[#e5e9e5] active:scale-95">
              <HomeIcon />
              Go home
            </Link>
          </div>

          {/* Error digest */}
          {error.digest && <p className="mt-8 text-[11px] font-medium tracking-wider text-[#3f4944]/40">Error reference: {error.digest}</p>}
        </div>
      </main>
    );
}
