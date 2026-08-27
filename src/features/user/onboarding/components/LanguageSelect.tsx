"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = ["Arabic", "English", "Hindi", "Urdu", "Malayalam", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi", "Gujarati", "Punjabi", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese", "Korean", "Turkish", "Persian", "Indonesian", "Malay"].sort();

interface LanguageSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function LanguageSelect({ value, onChange, error }: LanguageSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLanguage = (language: string) => {
    if (value.includes(language.toLowerCase())) {
      onChange(value.filter((item) => item !== language.toLowerCase()));
    } else {
      onChange([...value, language.toLowerCase()]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Selected languages */}
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="min-h-[48px] w-full rounded-xl bg-[#e0e3e0] px-4 py-3 text-left outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56]/20">
        {value.length === 0 ? (
          <span className="text-[#6f7a74]/70">Select languages...</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {value.map((language) => (
              <span key={language} className="rounded-full bg-[#0f6e56] px-3 py-1 text-xs font-semibold text-white">
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-[#bec9c3]/30 bg-white p-2 shadow-lg">
          {LANGUAGES.map((language) => {
            const normalizedLanguage = language.toLowerCase();
            const selected = value.includes(normalizedLanguage);

            return (
              <button key={language} type="button" onClick={() => toggleLanguage(language)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${selected ? "bg-[#0f6e56]/10 text-[#0f6e56]" : "text-[#181d1a] hover:bg-[#e5e9e5]"}`}>
                <span>{language}</span>

                {selected && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
